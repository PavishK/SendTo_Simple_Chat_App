import { useChatStore } from '../store/useChatStore.js';
import Sidebar from '../components/Sidebar.jsx';
import NoUserSelected from '../components/NoChatSelected.jsx';
import ChatContainer from '../components/ChatContainer';

function Home() {
  const { selectedUser } = useChatStore();

  return (
    <div className='bg-base-200 h-screen'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
          <Sidebar/>

          {!selectedUser ? <NoUserSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home