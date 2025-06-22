import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { CreatePromptScreen } from './screens/CreatePromptScreen';
import { ExecutePromptScreen } from './screens/ExecutePromptScreen';
import { MyPromptsScreen } from './screens/MyPromptsScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { AccountScreen } from './screens/AccountScreen';
import { ChatScreen } from './screens/ChatScreen';
import { AuthModal } from './components/auth/AuthModal';
import { AppState, JobDetection, Prompt } from './src/types';
import { useAuth } from './hooks/useAuth';

interface OnboardingData {
  name: string;
  email: string;
  profession: string;
}

interface TempUser {
  id: string;
  name: string;
  email: string;
  profession: string;
  isPro: boolean;
  promptsUsed: number;
  promptsLimit: number;
}

function App() {
  const { user, loading, upgradeToPro } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'home',
    user: null,
    selectedPrompt: null
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [tempUser, setTempUser] = useState<TempUser | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check if user has completed onboarding
  useEffect(() => {
    const completed = localStorage.getItem('promptly_onboarding_completed');
    const savedTempUser = localStorage.getItem('promptly_temp_user');
    
    if (completed && savedTempUser) {
      setHasCompletedOnboarding(true);
      setTempUser(JSON.parse(savedTempUser));
    }
  }, []);

  // Update app state when user changes
  useEffect(() => {
    if (user) {
      console.log('User authenticated, updating app state:', user);
      setShowAuthModal(false);
      setAppState(prev => ({
        ...prev,
        user,
        currentScreen: 'home'
      }));
      
      // Clear temp user when real user is authenticated
      setTempUser(null);
      localStorage.removeItem('promptly_temp_user');
      localStorage.removeItem('promptly_onboarding_completed');
    }
  }, [user]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600 font-medium">Chargement de Promptly...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, skip onboarding
  if (user) {
    const handleNavigate = (screen: string) => {
      console.log('Navigating to:', screen);
      setAppState(prev => ({
        ...prev,
        currentScreen: screen as any
      }));
    };

    const handleSelectPrompt = (prompt: Prompt) => {
      setAppState(prev => ({
        ...prev,
        selectedPrompt: prompt,
        currentScreen: 'execute-prompt'
      }));
    };

    const handleUpgrade = async () => {
      try {
        await upgradeToPro();
        alert('Félicitations ! Vous êtes maintenant un utilisateur PRO 🎉');
      } catch (error) {
        console.error('Error upgrading to PRO:', error);
        alert('Une erreur est survenue lors de la mise à niveau');
      }
    };

    // Render current screen for authenticated user
    switch (appState.currentScreen) {
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
      case 'library':
        return <LibraryScreen user={user} onNavigate={handleNavigate} onSelectPrompt={handleSelectPrompt} />;
      case 'create-prompt':
        return <CreatePromptScreen onNavigate={handleNavigate} user={user} />;
      case 'execute-prompt':
        return <ExecutePromptScreen prompt={appState.selectedPrompt || undefined} onNavigate={handleNavigate} />;
      case 'my-prompts':
        return <MyPromptsScreen onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityScreen onNavigate={handleNavigate} isPro={user.isPro} />;
      case 'account':
        return <AccountScreen user={user} onNavigate={handleNavigate} onUpgrade={handleUpgrade} />;
      case 'chat':
        return <ChatScreen user={user} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
    }
  }

  // Show onboarding if user hasn't completed it and no authenticated user
  if (!hasCompletedOnboarding && !user) {
    return (
      <>
        <OnboardingScreen 
          onContinue={(data: OnboardingData) => {
            console.log('Onboarding completed, creating temp user');
            const newTempUser: TempUser = {
              id: 'temp-user-' + Date.now(),
              name: data.name,
              email: data.email,
              profession: data.profession,
              isPro: false,
              promptsUsed: 0,
              promptsLimit: 10
            };
            
            setTempUser(newTempUser);
            setHasCompletedOnboarding(true);
            setOnboardingData(data);
            
            // Save to localStorage
            localStorage.setItem('promptly_onboarding_completed', 'true');
            localStorage.setItem('promptly_temp_user', JSON.stringify(newTempUser));
          }}
          onSignIn={() => {
            console.log('User wants to sign in');
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
          onSignUp={(data: OnboardingData) => {
            console.log('User wants to sign up with data');
            setOnboardingData(data);
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            console.log('Auth modal closed');
            setShowAuthModal(false);
          }}
          mode={authMode}
          onModeChange={setAuthMode}
          onboardingData={onboardingData}
        />
      </>
    );
  }

  const handleNavigate = (screen: string) => {
    console.log('Navigating to:', screen);
    
    // Check if user needs to authenticate for certain actions
    if (!user && (screen === 'create-prompt' || screen === 'my-prompts' || screen === 'account' || screen === 'chat')) {
      console.log('Authentication required for:', screen);
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    
    setAppState(prev => ({
      ...prev,
      currentScreen: screen as any
    }));
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    // Check if user needs to authenticate for using prompts
    if (!user) {
      console.log('Authentication required for using prompts');
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    
    setAppState(prev => ({
      ...prev,
      selectedPrompt: prompt,
      currentScreen: 'execute-prompt'
    }));
  };

  const handleUpgrade = async () => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    
    try {
      await upgradeToPro();
      alert('Félicitations ! Vous êtes maintenant un utilisateur PRO 🎉');
    } catch (error) {
      console.error('Error upgrading to PRO:', error);
      alert('Une erreur est survenue lors de la mise à niveau');
    }
  };

  // Use temp user if no authenticated user
  const currentUser = tempUser;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600 font-medium">Initialisation...</p>
        </div>
      </div>
    );
  }

  // Render current screen for temp user
  switch (appState.currentScreen) {
    case 'home':
      return (
        <>
          <HomeScreen
            user={currentUser}
            onNavigate={handleNavigate}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onboardingData={onboardingData}
          />
        </>
      );
    
    case 'library':
      return (
        <>
          <LibraryScreen
            user={currentUser}
            onNavigate={handleNavigate}
            onSelectPrompt={handleSelectPrompt}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onboardingData={onboardingData}
          />
        </>
      );
    
    case 'create-prompt':
      return (
        <CreatePromptScreen
          onNavigate={handleNavigate}
          user={currentUser}
        />
      );
    
    case 'execute-prompt':
      return (
        <ExecutePromptScreen
          prompt={appState.selectedPrompt || undefined}
          onNavigate={handleNavigate}
        />
      );
    
    case 'my-prompts':
      return (
        <MyPromptsScreen
          onNavigate={handleNavigate}
        />
      );
    
    case 'community':
      return (
        <>
          <CommunityScreen
            onNavigate={handleNavigate}
            isPro={currentUser.isPro}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onboardingData={onboardingData}
          />
        </>
      );
    
    case 'account':
      return (
        <AccountScreen
          user={currentUser}
          onNavigate={handleNavigate}
          onUpgrade={handleUpgrade}
        />
      );
    
    case 'chat':
      return (
        <ChatScreen
          user={currentUser}
          onNavigate={handleNavigate}
        />
      );
    
    default:
      return (
        <>
          <HomeScreen
            user={currentUser}
            onNavigate={handleNavigate}
          />
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            mode={authMode}
            onModeChange={setAuthMode}
            onboardingData={onboardingData}
          />
        </>
      );
  }
}

export default App;