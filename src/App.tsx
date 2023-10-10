import AIChatResponse from './components/AIChatResponse';

function App() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <AIChatResponse
        textResponse="**Hello!** This is a [link](http://example.com)"
        referenceLinks={[
          { url: 'http://example.com', description: 'Example' },
          { url: 'http://google.com', description: 'Google' },
        ]}
      />
    </div>
  );
}

export default App;