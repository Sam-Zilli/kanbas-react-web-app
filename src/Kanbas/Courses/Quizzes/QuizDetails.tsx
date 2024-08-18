import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as client from './client'; // Import your API client

// Define the type for QuizData
interface QuizData {
    name: string;
    description?: string;
    course: string;
    points: number;
    dueDate?: string;
    availableDate?: string;
    untilDate?: string;
    numberOfQuestions: number;
    studentScore: number;
    published: boolean;
    type: "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
    assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attempts: number;
    showCorrectAnswers: "Never" | "AfterSubmission" | "AfterDueDate";
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    questions: any[]; // Replace with the appropriate type if you have one
}

export default function QuizDetails() {
    const { cid, qid } = useParams<{ cid: string; qid: string }>(); // Extract course ID and quiz ID from URL params
    const navigate = useNavigate(); // For navigation
    
    // Initialize state with default values
    const [quizData, setQuizData] = useState<QuizData>({
        name: "",
        description: "",
        course: cid || "", // Set course to cid from params
        points: 0,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        numberOfQuestions: 0,
        studentScore: 0,
        published: false,
        type: "Graded Quiz", // Default type
        assignmentGroup: "Quizzes", // Default assignment group
        shuffleAnswers: true, // Default Yes
        timeLimit: 20, // Default 20 minutes
        multipleAttempts: false, // Default No
        attempts: 1, // Default 1
        showCorrectAnswers: "Never", // Default Never
        accessCode: "",
        oneQuestionAtATime: true, // Default Yes
        webcamRequired: false, // Default No
        lockQuestionsAfterAnswering: false, // Default No
        questions: []
    });

    // Fetch quiz data from API
    useEffect(() => {
        const fetchQuizData = async () => {
            if (qid) {
                try {
                    const response = await client.getQuiz(cid as string, qid as string);
                    setQuizData(response);
                } catch (error) {
                    console.error("Failed to fetch quiz data:", error);
                }
            }
        };

        fetchQuizData();
    }, [cid, qid]);

    // Helper function to format dates
    const formatDate = (date: string | Date | undefined): string => 
        date ? new Date(date).toLocaleDateString() : 'N/A';

    // Destructure quiz data for easier access
    const {
        name,
        type,
        points,
        assignmentGroup,
        shuffleAnswers,
        timeLimit,
        multipleAttempts,
        attempts,
        showCorrectAnswers,
        accessCode,
        oneQuestionAtATime,
        webcamRequired,
        lockQuestionsAfterAnswering,
        dueDate,
        availableDate,
        untilDate
    } = quizData;

    // Navigation functions
    const handlePreview = () => {
        if (qid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
        }
    };

    const handleEdit = () => {
        if (qid) {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h2>{name}</h2>
                </div>
                <div className="card-body">
                    <dl className="row">
                        <dt className="col-sm-4">Quiz Type:</dt>
                        <dd className="col-sm-8">{type}</dd>

                        <dt className="col-sm-4">Points:</dt>
                        <dd className="col-sm-8">{points}</dd>

                        <dt className="col-sm-4">Assignment Group:</dt>
                        <dd className="col-sm-8">{assignmentGroup}</dd>

                        <dt className="col-sm-4">Shuffle Answers:</dt>
                        <dd className="col-sm-8">{shuffleAnswers ? 'Yes' : 'No'}</dd>

                        <dt className="col-sm-4">Time Limit:</dt>
                        <dd className="col-sm-8">{timeLimit} Minutes</dd>

                        <dt className="col-sm-4">Multiple Attempts:</dt>
                        <dd className="col-sm-8">{multipleAttempts ? 'Yes' : 'No'}</dd>
                        {multipleAttempts && (
                            <>
                                <dt className="col-sm-4">How Many Attempts:</dt>
                                <dd className="col-sm-8">{attempts}</dd>
                            </>
                        )}

                        <dt className="col-sm-4">Show Correct Answers:</dt>
                        <dd className="col-sm-8">{showCorrectAnswers}</dd>

                        <dt className="col-sm-4">Access Code:</dt>
                        <dd className="col-sm-8">{accessCode || 'None'}</dd>

                        <dt className="col-sm-4">One Question at a Time:</dt>
                        <dd className="col-sm-8">{oneQuestionAtATime ? 'Yes' : 'No'}</dd>

                        <dt className="col-sm-4">Webcam Required:</dt>
                        <dd className="col-sm-8">{webcamRequired ? 'Yes' : 'No'}</dd>

                        <dt className="col-sm-4">Lock Questions After Answering:</dt>
                        <dd className="col-sm-8">{lockQuestionsAfterAnswering ? 'Yes' : 'No'}</dd>

                        <dt className="col-sm-4">Due Date:</dt>
                        <dd className="col-sm-8">{formatDate(dueDate)}</dd>

                        <dt className="col-sm-4">Available Date:</dt>
                        <dd className="col-sm-8">{formatDate(availableDate)}</dd>

                        <dt className="col-sm-4">Until Date:</dt>
                        <dd className="col-sm-8">{formatDate(untilDate)}</dd>
                    </dl>
                </div>
                <div className="card-footer text-center">
                    <button onClick={handlePreview} className="btn btn-primary me-2">
                        Preview
                    </button>
                    <button onClick={handleEdit} className="btn btn-secondary">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
