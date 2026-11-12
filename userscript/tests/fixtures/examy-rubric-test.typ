// Source of examy-rubric-test.pdf (kept base64 encoded, as examy-rubric-test.pdf.base64): a small
// exam with rubrics, in the older formats: compiled with examy 1.0.0 and gradescope.typ (since
// removed; see git history), whose attachments are examy-rubric-test.regions.json and
// examy-rubric-test.rubric.json. examy-1.1-test.typ is the same exam in examy 1.1.0's formats.
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
