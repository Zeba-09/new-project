import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { assessmentConfigs } from '../../data/assessmentConfigs';
import { mockAssessments } from '../../data/mockData';
import { AssessmentConfig, AssessmentResponse, Assessment } from '../../types';
import { CheckCircle, Clock, ArrowRight, ArrowLeft, Target } from 'lucide-react';

const Assessment: React.FC = () => {
  const { user } = useAuth();
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentConfig | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  if (!user) return null;

  const userAssessments = mockAssessments.filter(a => a.userId === user.id);

  const handleStartAssessment = (config: AssessmentConfig) => {
    setSelectedAssessment(config);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
    setFinalScore(0);
  };

  const handleAnswerSelect = (answer: string, score: number) => {
    if (!selectedAssessment) return;

    const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer,
      score
    };

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }
    
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (!selectedAssessment) return;

    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Complete assessment
      const totalScore = responses.reduce((sum, response) => sum + response.score, 0);
      setFinalScore(totalScore);
      setIsCompleted(true);

      // Save assessment (in real app, this would be an API call)
      const newAssessment: Assessment = {
        id: Date.now().toString(),
        userId: user.id,
        type: selectedAssessment.type,
        title: selectedAssessment.title,
        score: totalScore,
        maxScore: selectedAssessment.maxScore,
        completedAt: new Date().toISOString(),
        responses
      };
      
      mockAssessments.push(newAssessment);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToList = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
    setFinalScore(0);
  };

  const getCurrentResponse = () => {
    if (!selectedAssessment) return null;
    const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
    return responses.find(r => r.questionId === currentQuestion.id);
  };

  const getScoreInterpretation = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 25) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage <= 50) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage <= 75) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (isCompleted && selectedAssessment) {
    const interpretation = getScoreInterpretation(finalScore, selectedAssessment.maxScore);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
            <p className="text-gray-600">{selectedAssessment.title}</p>
          </div>

          <div className={`${interpretation.bg} rounded-lg p-6 mb-6`}>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {finalScore} / {selectedAssessment.maxScore}
              </p>
              <p className={`text-lg font-semibold ${interpretation.color}`}>
                {interpretation.level} Level
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round((finalScore / selectedAssessment.maxScore) * 100)}% of maximum score
              </p>
            </div>
          </div>

          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recommendations:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {interpretation.level === 'Low' && (
                <p>• Your scores indicate low levels of concern in this area. Continue with your current wellness practices.</p>
              )}
              {interpretation.level === 'Mild' && (
                <p>• Consider incorporating stress management techniques and regular check-ins with Tara.</p>
              )}
              {interpretation.level === 'Moderate' && (
                <p>• We recommend regular sessions with Tara and consider speaking with a counselor if symptoms persist.</p>
              )}
              {interpretation.level === 'High' && (
                <p>• Please consider reaching out to a mental health professional. Tara is also available for immediate support.</p>
              )}
            </div>
          </div>

          <button
            onClick={handleBackToList}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
    const currentResponse = getCurrentResponse();
    const progress = ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedAssessment.title}</h2>
              <button
                onClick={handleBackToList}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Exit
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.text, option.score)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    currentResponse?.answer === option.text
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      currentResponse?.answer === option.text
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {currentResponse?.answer === option.text && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!currentResponse}
              className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {currentQuestionIndex === selectedAssessment.questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wellness Assessments</h1>
        <p className="text-gray-600">Take assessments to track your mental health and wellness</p>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentConfigs.map((config) => {
          const userCompletedThis = userAssessments.find(a => a.type === config.type);
          
          return (
            <div key={config.type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                {userCompletedThis && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{config.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{config.questions.length} questions • ~{Math.ceil(config.questions.length * 0.5)} min</span>
              </div>

              {userCompletedThis && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">Last completed:</p>
                  <p className="font-medium text-gray-900">
                    {new Date(userCompletedThis.completedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Score: {userCompletedThis.score}/{userCompletedThis.maxScore}
                  </p>
                </div>
              )}

              <button
                onClick={() => handleStartAssessment(config)}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
              >
                {userCompletedThis ? 'Retake Assessment' : 'Start Assessment'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent Results */}
      {userAssessments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Recent Results</h2>
          <div className="space-y-4">
            {userAssessments
              .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
              .slice(0, 5)
              .map((assessment) => {
                const interpretation = getScoreInterpretation(assessment.score, assessment.maxScore);
                return (
                  <div key={assessment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(assessment.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {assessment.score}/{assessment.maxScore}
                      </p>
                      <p className={`text-sm font-medium ${interpretation.color}`}>
                        {interpretation.level}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;