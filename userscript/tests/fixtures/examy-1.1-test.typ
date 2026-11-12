// Source of examy-1.1-test.pdf (kept base64 encoded, as examy-1.1-test.pdf.base64): the exam of
// examy-rubric-test.typ, compiled with examy 1.1.0, which attaches its regions and rubrics itself
// (embed-metadata). Its attachments are examy-1.1-test.regions.json and examy-1.1-test.rubric.json.
// To remake them: typst compile examy-1.1-test.typ, and pdfdetach -saveall.
#import "@preview/examy:1.1.0": *
#show: exam.with(show-solutions: false, embed-metadata: true)
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
