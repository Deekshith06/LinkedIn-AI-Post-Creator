import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Hash, 
  Target, 
  Clock, 
  TrendingUp, 
  User, 
  Briefcase, 
  MessageCircle, 
  ThumbsUp, 
  Share2,
  Copy,
  Calendar,
  BarChart3,
  Settings,
  Wand2,
  FileText,
  Image,
  Video,
  PieChart
} from 'lucide-react';

interface PostData {
  content: string;
  hashtags: string[];
  tone: string;
  type: string;
  industry: string;
  userThoughts: string;
  selectedTopic: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [postData, setPostData] = useState<PostData>({
    content: '',
    hashtags: [],
    tone: 'professional',
    type: 'update',
    industry: 'Technology', // Capitalized for select consistency
    userThoughts: '',
    selectedTopic: ''
  });
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const tones = [
    { id: 'professional', name: 'Professional', icon: Briefcase, color: 'bg-blue-500' },
    { id: 'casual', name: 'Casual', icon: MessageCircle, color: 'bg-green-500' },
    { id: 'inspirational', name: 'Inspirational', icon: TrendingUp, color: 'bg-purple-500' },
    { id: 'educational', name: 'Educational', icon: FileText, color: 'bg-orange-500' }
  ];

  const postTypes = [
    { id: 'update', name: 'Professional Update', icon: User, description: 'Share career milestones and achievements' },
    { id: 'insight', name: 'Industry Insight', icon: BarChart3, description: 'Share knowledge and expertise' },
    { id: 'story', name: 'Personal Story', icon: MessageCircle, description: 'Tell engaging personal experiences' },
    { id: 'poll', name: 'Poll/Question', icon: PieChart, description: 'Engage audience with questions' }
  ];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Marketing', 'Sales', 'Consulting', 
    'Education', 'Real Estate', 'Manufacturing', 'Retail', 'Hospitality', 'Other'
  ];

  const trendingHashtags = [
    '#AI', '#MachineLearning', '#DigitalTransformation', '#Leadership', '#Innovation',
    '#CareerGrowth', '#Networking', '#Entrepreneurship', '#DataScience', '#CloudComputing',
    '#Sustainability', '#RemoteWork', '#Productivity', '#PersonalBranding', '#LinkedInTips'
  ];

  const trendingTopics = [
    {
      id: 'ai-workplace',
      title: 'AI Transforming Workplace Productivity',
      description: 'How artificial intelligence is reshaping modern work environments',
      category: 'Technology',
      trending: true
    },
    {
      id: 'remote-hybrid',
      title: 'Future of Remote and Hybrid Work Models',
      description: 'Companies adapting to flexible work arrangements post-2024',
      category: 'Workplace',
      trending: true
    },
    {
      id: 'sustainability-business',
      title: 'Sustainable Business Practices',
      description: 'Green initiatives driving corporate responsibility and profit',
      category: 'Business',
      trending: false
    },
    {
      id: 'digital-skills',
      title: 'Essential Digital Skills for 2025',
      description: 'Key competencies professionals need in the digital age',
      category: 'Career',
      trending: true
    },
    {
      id: 'mental-health-work',
      title: 'Mental Health in Professional Settings',
      description: 'Workplace wellness and employee mental health initiatives',
      category: 'Wellness',
      trending: false
    },
    {
      id: 'blockchain-finance',
      title: 'Blockchain Revolution in Finance',
      description: 'How distributed ledger technology is changing financial services',
      category: 'Finance',
      trending: false
    },
    {
      id: 'diversity-inclusion',
      title: 'Diversity & Inclusion in Tech',
      description: 'Building more inclusive and diverse technology teams',
      category: 'Culture',
      trending: true
    },
    {
      id: 'startup-funding',
      title: 'Startup Funding Landscape 2025',
      description: 'Current trends in venture capital and startup investments',
      category: 'Entrepreneurship',
      trending: false
    }
  ];
  const samplePosts = {
    professional: `🚀 Excited to share that our team just launched a groundbreaking AI-powered solution that's already showing 40% efficiency improvements for our clients!

This journey taught me that innovation isn't just about technology—it's about understanding real business challenges and crafting solutions that make a meaningful impact.

Key insights from this project:
• Cross-functional collaboration drives the best outcomes
• User feedback is invaluable throughout development
• Sometimes the simplest solutions are the most powerful

What's your experience with implementing AI in your organization? I'd love to hear your thoughts!`,

    casual: `Had an amazing coffee chat with a fellow professional today ☕

Sometimes the best career advice comes from unexpected conversations. Today I learned about a completely different approach to project management that I'm excited to try out.

It's a good reminder that every person you meet has something valuable to share. Whether you're early in your career or a seasoned professional, staying curious and open to learning never gets old.

Who's taught you something valuable recently?`,

    inspirational: `💡 "The biggest risk is not taking any risk at all."

Three years ago, I left my comfortable corporate job to start something new. It was terrifying, but it led to the most rewarding chapter of my career.

Here's what I learned:
✨ Comfort zones are growth killers
✨ Failure is feedback, not final
✨ Your network becomes your net worth
✨ Persistence beats perfection

To everyone considering a leap of faith: the time will never feel "perfect." But your future self will thank you for being brave today.

What's one risk you're glad you took?`,

    educational: `🎯 The 5 Essential Skills Every Professional Needs in 2025

After analyzing trends across multiple industries, here are the skills that consistently drive career success:

1️⃣ Digital Literacy: Understanding AI tools and digital workflows
2️⃣ Emotional Intelligence: Building stronger professional relationships  
3️⃣ Data Interpretation: Making informed decisions from complex information
4️⃣ Adaptability: Thriving in rapidly changing environments
5️⃣ Communication: Clearly conveying ideas across diverse audiences

The good news? These are all learnable skills. Start with one that excites you most and commit to improving it over the next 90 days.

Which skill are you working on developing? Share your learning journey below! 👇`
  };

  useEffect(() => {
    setCharacterCount(generatedPost.length);
  }, [generatedPost]);

  const generatePost = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const sample = samplePosts[postData.tone as keyof typeof samplePosts];
      setGeneratedPost(sample);
      setIsGenerating(false);
      setCurrentStep(3);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost + '\n\n' + postData.hashtags.join(' '));
  };

  const StepIndicator = ({ step, title, completed }: { step: number; title: string; completed: boolean }) => (
    <div className={`flex items-center space-x-3 ${completed ? 'text-blue-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {step}
      </div>
      <span className="font-medium">{title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LinkedIn AI Post Creator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <StepIndicator step={1} title="Configure" completed={currentStep >= 1} />
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <StepIndicator step={2} title="Generate" completed={currentStep >= 2} />
            <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <StepIndicator step={3} title="Preview & Share" completed={currentStep >= 3} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Post Type Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Select Post Type
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {postTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setPostData({ ...postData, type: type.id })}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            postData.type === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className={`w-6 h-6 ${postData.type === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
                            <div className="text-left">
                              <h3 className={`font-medium ${postData.type === type.id ? 'text-blue-900' : 'text-gray-900'}`}>
                                {type.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tone Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Choose Tone
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tones.map((tone) => {
                      const IconComponent = tone.icon;
                      return (
                        <button
                          key={tone.id}
                          onClick={() => setPostData({ ...postData, tone: tone.id })}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            postData.tone === tone.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${tone.color} flex items-center justify-center mx-auto mb-2`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className={`text-sm font-medium ${postData.tone === tone.id ? 'text-blue-900' : 'text-gray-900'}`}>
                            {tone.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Industry Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                    Industry
                  </h2>
                  <select
                    value={postData.industry}
                    onChange={(e) => setPostData({ ...postData, industry: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User Thoughts Input */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Your Thoughts (Optional)
                  </h2>
                  <textarea
                    value={postData.userThoughts}
                    onChange={(e) => setPostData({ ...postData, userThoughts: e.target.value })}
                    placeholder="Share your thoughts, experiences, or key points you'd like to include in your post..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This helps our AI create more personalized content based on your unique perspective.
                  </p>
                </div>

                {/* Trending Topics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Trending Topics
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Select a trending topic to make your post more relevant and engaging
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trendingTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setPostData({ ...postData, selectedTopic: topic.id })}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md text-left ${
                          postData.selectedTopic === topic.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-medium text-sm ${
                            postData.selectedTopic === topic.id ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {topic.title}
                          </h3>
                          {topic.trending && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{topic.description}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          postData.selectedTopic === topic.id 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {topic.category}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPostData({ ...postData, selectedTopic: '' })}
                    className={`mt-3 px-4 py-2 text-sm rounded-lg transition-colors ${
                      postData.selectedTopic === '' 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    No specific topic
                  </button>
                </div>
                {/* Generate Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Post</span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className={`w-8 h-8 text-white ${isGenerating ? 'animate-pulse' : ''}`} />
                    </div>
                    {isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {isGenerating ? 'Generating Your Perfect Post...' : 'Ready to Generate'}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {isGenerating 
                      ? 'Our AI is crafting a personalized LinkedIn post based on your preferences.'
                      : 'Click below to create an engaging LinkedIn post tailored to your audience.'
                    }
                  </p>
                  {!isGenerating && (
                    <button
                      type="button"
                      onClick={generatePost}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Post</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Generated Post
                </h2>
                
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <textarea
                    value={generatedPost}
                    onChange={(e) => setGeneratedPost(e.target.value)}
                    className="w-full h-64 resize-none border-none focus:outline-none"
                    placeholder="Your generated post will appear here..."
                  />
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <span className={`text-sm ${characterCount > 3000 ? 'text-red-600' : 'text-gray-600'}`}>
                      {characterCount}/3000 characters
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <Image className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-between">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Post</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Edit Settings</span>
                  </button>
                  
                  <button type="button" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* LinkedIn Preview */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Preview</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Your Name</p>
                      <p className="text-sm text-gray-600">Professional Title</p>
                    </div>
                  </div>
                  <p className="text-gray-900 mb-4 whitespace-pre-line">{generatedPost.slice(0, 200)}...</p>
                  <div className="flex items-center justify-between text-gray-600 text-sm">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Hashtags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-2 text-blue-600" />
                Trending Hashtags
              </h3>
              <div className="space-y-2">
                {trendingHashtags.slice(0, 8).map((hashtag) => (
                  <button
                    type="button"
                    key={hashtag}
                    onClick={() => {
                      if (!postData.hashtags.includes(hashtag)) {
                        setPostData({ ...postData, hashtags: [...postData.hashtags, hashtag] });
                      }
                    }}
                    className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {hashtag}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Topic Insights */}
            {postData.selectedTopic && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Topic Insights
                </h3>
                {(() => {
                  const selectedTopicData = trendingTopics.find(t => t.id === postData.selectedTopic);
                  return selectedTopicData ? (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{selectedTopicData.title}</h4>
                      <p className="text-sm text-gray-700 mb-3">{selectedTopicData.description}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>High engagement potential</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Relevant to current industry discussions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Great for thought leadership</span>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
            {/* Best Posting Times */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Optimal Posting Times
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tuesday</span>
                  <span className="text-sm font-medium text-green-600">9:00 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Wednesday</span>
                  <span className="text-sm font-medium text-green-600">12:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Thursday</span>
                  <span className="text-sm font-medium text-green-600">2:00 PM</span>
                </div>
              </div>
            </div>

            {/* Engagement Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Engagement Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ask questions to encourage comments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use 3-5 relevant hashtags</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share personal insights or experiences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include a clear call-to-action</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;