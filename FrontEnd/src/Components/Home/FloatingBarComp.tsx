import React, { useState } from 'react'
import DragFood from './DragFood'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface FloatingBarCompProps {
  selectedItems: any
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>
}

function FloatingBarComp({
  selectedItems,
  setSelectedItems,
}: FloatingBarCompProps) {
  const [folded, setFolded] = useState(false)
  const handleOverFlow = folded ? 'hidden' : 'scroll'

  const toggleFolded = () => {
    setFolded(!folded)
  }

  const handleRemove = (item: any) => {
    setTimeout(() => {
      setSelectedItems(selectedItems.filter((i: any) => i.id !== item.id))
    }, 1000)
  }

  return (
    <div className={`floating-bar ${folded ? 'folded' : ''}`}>
      <div style={{}}>
        <h3>Selected Items</h3>
        {!folded && (
          <p style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>
            Drag items to the schedule to plan your meals!
          </p>
        )}
        <button
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: '#1877f2',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: 'bold',
          }}
          onClick={toggleFolded}
        >
          {folded ? '+' : '-'}
        </button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="selected-items" style={{ overflowY: handleOverFlow }}>
          {selectedItems.map((item: any, index: number) => {
            if (item.servings > 0) {
              return (
                <DragFood
                  handleRemove={handleRemove}
                  key={index}
                  foodItem={item}
                />
              )
            }
          })}
        </div>
      </DndProvider>
    </div>
  )
}

export default FloatingBarComp
