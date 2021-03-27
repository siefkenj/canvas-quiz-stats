import React from "react";

export function Question({ data = {} }) {
    const { question_type, question_text, id, answers, type } = data;

    if (type === "question_group") {
        return <QuestionGroup data={data} />;
    }
    let answerNodes = null;
    if (
        question_type !== "text_only_question" &&
        question_type !== "essay_question"
    ) {
        answerNodes = (
            <div className="question-answer-box">
                {answers.map((answer, i) => (
                    <Answer data={answer} key={i} extraClass={question_type} />
                ))}
            </div>
        );
    }

    return (
        <div className="question-container">
            <div className="question-id">
                {id} (type: {question_type})
            </div>
            <div
                className="question-body"
                dangerouslySetInnerHTML={{ __html: question_text }}
            />
            {answerNodes}
        </div>
    );
}

function QuestionGroup({ data = {} }) {
    const { question_points, pick_count, questions } = data;
    return (
        <div className="group-container">
            <h4>
                Question Group (Pick {pick_count} of {questions.length};{" "}
                {question_points} points each)
            </h4>
            <div className="question-group">
                {questions.map((question, i) => (
                    <Question data={question} key={i} />
                ))}
            </div>
        </div>
    );
}

function Answer({ data = {}, extraClass }) {
    let { text, html, weight } = data;
    if (!html) {
        html = text;
    }

    return (
        <div
            className={`question-option ${extraClass} ${
                weight > 0 ? "correct" : "incorrect"
            }`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
