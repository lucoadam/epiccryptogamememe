import { getMemeImages } from '@/api/helpers'
import React from 'react'

const RecentMemes:React.FC<{
    memes: any[]
}> = ({
    memes = []
}) => {

  return (
    <div className='m-10 flex justify-center flex-col px-8 gap-8'>
      <div>
        <h1 className='text-4xl font-bold text-center'>Recent Memes</h1>
      </div>

      <div className='flex flex-wrap justify-center gap-8 px-8'>
        {memes.map((meme: any, index) => (
          <div key={meme._id} className='flex flex-col items-center justify-center w-80'>
            <img src={meme.generatedImage} alt={meme.prompt} className='w-80 h-80 object-contain' />
            <div className='text-center'>{meme.prompt}</div>
          </div>
        ))}
        {memes.length === 0 && (
            <div className='flex flex-col items-center justify-center w-80'>
                No memes yet
                </div>
                )}
      </div>
    </div>
  )
}

export default RecentMemes
