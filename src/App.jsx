import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Card from './components/Card';


function App() {
  

  const defaultCards = [
    {
      
      path:"../public/img/ananas.png",
      isMatched:false
    },
    {
      
      path:"../public/img/cilek.jpg",
      isMatched:false
    },
    {
      
      path:"../public/img/karpuz.jpg",
      isMatched:false
    },
    {
      
      path:"../public/img/muz.jpg",
      isMatched:false
    },
    {
      
      path:"../public/img/nar.jpg",
      isMatched:false
    },
    {
      
      path:"../public/img/uzum.jpg",
      isMatched:false
    },
  ]

  const [cards,setCards] = useState([])
  const [selectedOne,setSelectedOne] = useState(null)
  const [selectedTwo,setSelectedTwo] = useState(null)
  const [disabled,setDisabled] = useState(null)

  const prepareCards = () => {
    const sortedCards = [...defaultCards,...defaultCards].sort(
      () => 0.5 - Math.random()
    ).map((card) => (
      {
        ...card, 
        id:Math.random()
      }
    )
    )
    setCards(sortedCards)
    setSelectedOne(null)
    setSelectedTwo(null)
    setDisabled(false)
    resetState();
  };

  const handleSelected = (card) => {
    if(disabled) return true
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  useEffect(() => {
    prepareCards();
  },[]);

  useEffect(() => {
    if(selectedOne && selectedTwo)
    {
      setDisabled(true)

      if(selectedOne.path === selectedTwo.path)
      {
        setCards((prev) => {
          return prev.map((card) => {
            if(card.path === selectedOne.path)
            {
              return {...card,isMatched:true};
            }
            else {
              return card;
            }
          })
        })
        resetState()
      }

      else
      {
        setTimeout(() => {
          resetState()
        }, 2000);
      }
    }
  },[selectedOne,selectedTwo])

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  }

  const allMatched = cards.every(card => card.isMatched);

  return (
    <div className='h-screen w-full'>
      <section>
        <h1 className='text-4xl text-center font-semibold my-3'>Tahmin Etme Oyunu</h1>
        <button className='bg-[#00ADB5] p-3 rounded-lg outline-none text-center my-4 block mx-auto hover:text-black transition-all duration-500'
          onClick={() => prepareCards()}
        >
          Oyunu Başlat
        </button>
        {
          allMatched ? <h1 className='text-5xl mx-5 text-yellow-500 font-bold text-center  px-5 py-2 shadow-lg'>Oyun Bitti</h1>
          :
          <div className='grid md:grid-cols-4 grid-cols-2  gap-4   w-[1000px] mx-auto'>
          {
            
            cards.map((card,i) => (
              <Card key={i}  
              card={card} 
              handleSelected={handleSelected}
              disabled={disabled}
              rotated={card === selectedOne || card === selectedTwo || card.isMatched }
               />
            ))
          }
          
            
        </div>
        }
        
      </section>
     
    </div>
  )
}

export default App
