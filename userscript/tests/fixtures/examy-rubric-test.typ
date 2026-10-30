// Source of examy-rubric-test.pdf (kept base64 encoded, as examy-rubric-test.pdf.base64): a small exam with rubrics, compiled with gradescope.typ, whose
// attachments are examy-rubric-test.regions.json and examy-rubric-test.rubric.json. To remake it,
// put this next to gradescope.typ and a clone of examy 1.0.0 (typst-examy/), and compile it.
#import "typst-examy/src/lib.typ": *
#import "gradescope.typ": gradescope
#show: gradescope(e, answer-box)
#show: exam.with(show-solutions: false)
#name-block()
#question(points: 2)[
  State the Mean Value Theorem.
  #answer-box(height: 1fr)[
    #rubric(points: 2)[*Correct*: hypotheses and conclusion.]
    #rubric(points: 1)[*Partial*: conclusion only.]
  ]
]
#question[
  #part(points: 1)[Is $1/2$ rational? #answer-box(height: 1in)[ #rubric(points: 1)[Yes, with a reason.] ]]
  #part(points: 2)[Prove it. #answer-box(height: 1fr)[ #rubric(annotation: [pick one])[*Proof* #rubric(points: 2)[Complete] #rubric(points: 1)[Gaps]] ]]
]
