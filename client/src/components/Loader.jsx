function Loader({ size = 'loading-xl' }) {
  return (
    <div className='flex items-center justify-center h-screen z-9999'>
        <span className={`loading loading-spinner ${size}`}/>
    </div>
  )
}

export default Loader