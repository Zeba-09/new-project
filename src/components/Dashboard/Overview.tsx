import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockAssessments, mockTaraSessions } from '../../data/mockData';
import { TrendingUp, Calendar, Target, Brain, Heart, Activity } from 'lucide-react';

const Overview: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Get user-specific data
  const userAssessments = mockAssessments.filter(a => a.userId === user.id);
  const userTaraSessions = mockTaraSessions.filter(s => s.userId === user.id);
  
  // Calculate user-specific metrics
  const wellnessScore = user.wellnessScore || 0;
  const assessmentsCompleted = userAssessments.length;
  const taraSessionsCount = userTaraSessions.length;
  
  // Calculate recent activity
  const recentAssessments = userAssessments
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 3);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-emerald-100">Here's your wellness overview for today</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${getScoreBgColor(wellnessScore)} rounded-xl p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wellness Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(wellnessScore)}`}>
                {wellnessScore}%
              </p>
            </div>
            <div className={`p-3 rounded-full ${getScoreColor(wellnessScore)} bg-opacity-20`}>
              <Heart className={`h-6 w-6 ${getScoreColor(wellnessScore)}`} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>
                {wellnessScore >= 80 ? 'Excellent' : wellnessScore >= 60 ? 'Good' : 'Needs attention'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assessments</p>
              <p className="text-3xl font-bold text-blue-600">{assessmentsCompleted}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Completed this month</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tara Sessions</p>
              <p className="text-3xl font-bold text-purple-600">{taraSessionsCount}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Activity className="h-4 w-4 mr-1" />
              <span>Total sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessment Results</h2>
        {recentAssessments.length > 0 ? (
          <div className="space-y-4">
            {recentAssessments.map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                  <p className="text-sm text-gray-600">
                    Completed on {new Date(assessment.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {assessment.score}/{assessment.maxScore}
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.round((assessment.score / assessment.maxScore) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No assessments completed yet</p>
            <p className="text-sm text-gray-500 mt-1">Take your first assessment to see your progress</p>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personalized Insights</h2>
        <div className="space-y-3">
          {wellnessScore >= 80 && (
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="p-1 bg-green-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Great job!</p>
                <p className="text-sm text-green-700">Your wellness score is excellent. Keep up the good work!</p>
              </div>
            </div>
          )}
          
          {assessmentsCompleted === 0 && (
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-1 bg-blue-100 rounded-full">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Get started</p>
                <p className="text-sm text-blue-700">Take your first assessment to establish your wellness baseline.</p>
              </div>
            </div>
          )}

          {taraSessionsCount === 0 && (
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-1 bg-purple-100 rounded-full">
                <Brain className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800">Try Tara</p>
                <p className="text-sm text-purple-700">Start a conversation with Tara, your AI wellness companion.</p>
              </div>
            </div>
          )}

          {wellnessScore < 60 && assessmentsCompleted > 0 && (
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="p-1 bg-yellow-100 rounded-full">
                <Heart className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Focus on wellness</p>
                <p className="text-sm text-yellow-700">Consider scheduling regular Tara sessions and retaking assessments to track improvement.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;