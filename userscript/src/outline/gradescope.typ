// Gradescope data for an examy exam, for Canvas Quiz Stats' "Outline JSON" tool: where the answer
// boxes and the name block's lines are, each question's points, and the pages' sizes (the
// "regions"), and the exam's rubrics. Needs examy 1.0.0 or later. Use it either way:
//
// 1. In the exam, so that its PDF carries the data (as attached files `gradescope-regions.json`,
//    and `examy-rubric.json` if the exam has rubrics). Put this file next to the exam and, after
//    examy's import:
//
//      #import "@preview/examy:1.0.0": *
//      #import "gradescope.typ": gradescope
//      #show: gradescope(e, answer-box)
//
// 2. From the command line, for an exam left as it is: put this file next to the exam and run
//
//      typst eval --in gradescope.typ --input exam=quiz-04a.typ 'query(<gs-regions>).first().value' > quiz-04a-regions.json
//
//    `--input examy=1.1.0` picks the examy version the exam imports (1.0.0 by default), and
//    `--input examy=path/to/examy/src/lib.typ` an examy that is not installed as a package.
//
// Either way the exam is laid out exactly as it is: this adds only invisible markers. (It sets the
// page's `foreground` to one of them; an exam that sets its own page foreground loses the page
// sizes, and the tool then uses Gradescope's.) Positions are in pt from the page's top left.

#let _pt(l) = calc.round(l / 1pt, digits: 2)
#let _plain(c) = if type(c) == str { c } else if c.has("text") { c.text } else if c.has("children") { c.children.map(_plain).join() } else if c.has("body") { _plain(c.body) } else { "" }

// A box's or block's inset, in pt on each side. Needs context (for `em`).
#let _insets(i) = {
  let abs(v) = if v == none or v == auto { 0 } else if type(v) == relative { _pt(v.length.to-absolute()) } else if type(v) == length { _pt(v.to-absolute()) } else { 0 }
  if type(i) != dictionary {
    return (top: abs(i), bottom: abs(i), left: abs(i), right: abs(i))
  }
  let rest = i.at("rest", default: none)
  let x = i.at("x", default: rest)
  let y = i.at("y", default: rest)
  (
    top: abs(i.at("top", default: y)),
    bottom: abs(i.at("bottom", default: y)),
    left: abs(i.at("left", default: x)),
    right: abs(i.at("right", default: x)),
  )
}

// A page's margins, in pt, however they were set. Needs context.
#let _margins() = {
  let (w, h) = (page.width, page.height)
  let m = page.margin
  let all(v) = (top: v, bottom: v, left: v, right: v)
  let sides = if m == auto {
    all(2.5 / 21 * calc.min(w, h))
  } else if type(m) != dictionary {
    all(m)
  } else {
    let rest = m.at("rest", default: auto)
    let x = m.at("x", default: rest)
    let y = m.at("y", default: rest)
    (
      top: m.at("top", default: y),
      bottom: m.at("bottom", default: y),
      left: m.at("left", default: m.at("inside", default: x)),
      right: m.at("right", default: m.at("outside", default: x)),
    )
  }
  let resolve(v, size) = if v == auto { 2.5 / 21 * calc.min(w, h) } else if type(v) == ratio { v * size } else if type(v) == relative { v.ratio * size + v.length } else { v }
  (
    top: _pt(resolve(sides.top, h)),
    bottom: _pt(resolve(sides.bottom, h)),
    left: _pt(resolve(sides.left, w)),
    right: _pt(resolve(sides.right, w)),
  )
}

// The regions, from the markers, and examy's own record of its divisions (under the names of
// examy version `P`, e.g. "@preview/examy,v1.0.0"); `none` if there is no exam. Needs context.
#let _regions(P, exam) = {
  let at(loc) = {
    let p = loc.position()
    (page: p.page, x: _pt(p.x), y: _pt(p.y))
  }
  // Where each division starts, and each answer box, under the division it is in: its top left
  // and bottom right inside its inset, and the inset.
  let starts = (:)
  let boxes = (:)
  let division = none
  let top = none
  for m in query(selector(label(P + "/division")).or(<gs-box>)) {
    if m.label != <gs-box> {
      division = str(m.value)
      starts.insert(division, at(m.location()))
    } else if m.value.edge == "top" {
      top = (at: at(m.location()), inset: m.value.inset)
    } else if division != none and top != none {
      let b = (top: top.at, bottom: at(m.location()), inset: top.inset)
      boxes.insert(division, boxes.at(division, default: ()) + (b,))
      top = none
    }
  }

  // The name block's lines, each with its label: where the line starts (its top left) and ends.
  let names = ()
  let name = none
  let start = none
  for m in query(<gs-name>) {
    if m.value.kind == "label" {
      name = m.value.text
    } else if m.value.kind == "start" {
      start = at(m.location())
    } else if start != none {
      names.push((label: name, start: start, end: at(m.location())))
      (name, start) = (none, none)
    }
  }

  let exams = state(P + "/points-data").final()
  if exams == none or exams.len() == 0 {
    return none
  }
  let number(address) = address.map(n => if type(n) == int { str(n + 1) } else { str(n) }).join(".")
  (
    format: "examy-gradescope-regions",
    version: 1,
    exam: exam,
    pages: query(<gs-page>).map(m => (page: m.location().page(), ..m.value)),
    names: names,
    // Where each exam's questions end (in the same order as `exams`).
    ends: query(label(P + "/pages")).map(m => at(m.location())),
    exams: exams.map(rows => rows.map(r => (
      number: number(r.address),
      label: _plain(r.label),
      level: r.level,
      points: r.total_points,
      bonus: r.total_bonus_points,
      start: starts.at(str(r.id), default: none),
      boxes: boxes.at(str(r.id), default: ()),
    ))),
  )
}

/// A show rule that records the regions of an examy exam, and attaches them and the exam's rubrics
/// to its PDF: `#show: gradescope(e, answer-box)`, with `e` and `answer-box` from the exam's examy
/// import. `attach: false` only records them (for `query(<gs-regions>)`). `exam`: the exam's name,
/// written into the regions.
#let gradescope(e, answer-box, attach: true, exam: none) = doc => {
  // examy's names for its records, e.g. "@preview/examy,v1.0.0", from the answer box's id
  // ("e_@preview/examy,v1.0.0_---_answer-box").
  let P = e.data(answer-box).eid.split("_---_").first().trim("e_", at: start, repeat: false)

  set page(foreground: context [#metadata((width: _pt(page.width), height: _pt(page.height), margin: _margins()))<gs-page>])

  // Each answer box is drawn again with invisible markers placed at its top left and bottom right,
  // inside its inset (its position alone is that of a line's baseline when it sits in a line of
  // text).
  show e.selector(answer-box): it => {
    let fields = it.fields()
    let body = fields.remove("body", default: none)
    let _ = fields.remove("label", default: none)
    let inset = fields.at("inset", default: none)
    let edges = (
      place(top + left, context [#metadata((edge: "top", inset: _insets(inset)))<gs-box>])
        + place(bottom + right, [#metadata((edge: "bottom"))<gs-box>])
    )
    (it.func())(..fields, edges + body)
  }

  // The rows of a `name-block`: a label (a box with only a bottom inset) and a line to write on (a
  // box with only a bottom stroke, and an inset at its bottom and sides). Markers go before the
  // label (with its text) and on either side of the line.
  show box: it => {
    let (stroke, inset) = (it.stroke, it.inset)
    let shaped(d, keys) = type(d) == dictionary and d.keys().sorted() == keys
    if shaped(inset, ("bottom",)) and stroke in (none, (:)) {
      [#metadata((kind: "label", text: _plain(it.body).trim()))<gs-name>#it]
    } else if shaped(stroke, ("bottom",)) and shaped(inset, ("bottom", "left", "right")) {
      [#metadata((kind: "start"))<gs-name>#it#metadata((kind: "end"))<gs-name>]
    } else {
      it
    }
  }

  doc

  context {
    let data = _regions(P, exam)
    if data == none {
      return
    }
    [#metadata(data)<gs-regions>]
    if attach {
      pdf.attach(
        "gradescope-regions.json",
        bytes(json.encode(data)),
        mime-type: "application/json",
        description: "Where the exam's answer boxes are, for Gradescope's outline (Canvas Quiz Stats)",
      )
      // examy's own export of the rubrics (see its documentation, "Rubrics").
      let rubrics = query(<examy-rubric>).map(m => m.value)
      if rubrics.len() > 0 {
        pdf.attach(
          "examy-rubric.json",
          bytes(json.encode(rubrics)),
          mime-type: "application/json",
          description: "The exam's rubrics, as examy exports them",
        )
      }
    }
  }
}

// From the command line (see the top): lay out the exam named by `--input exam=..`.
#if "exam" in sys.inputs {
  let EXAMY = sys.inputs.at("examy", default: "1.0.0")
  import (if EXAMY.ends-with(".typ") { EXAMY } else { "@preview/examy:" + EXAMY }): e, answer-box
  show: gradescope(e, answer-box, exam: sys.inputs.exam)
  include sys.inputs.exam
}
