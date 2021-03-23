import React from 'react';


const Positions = ({positionUpdater, currentPos})=>{
    let playerPositions = ['RHP','LHP','P','C','1B','2B','3B','SS','RF','LF','CF']
    const handleClick = (e)=>{
        // e.preventDefault()
        let curPos = currentPos
        if(e.target.checked){
            let newPos = !curPos ? e.target.value: curPos += `, ${e.target.value}`
            positionUpdater(newPos)
            console.log(newPos)
        }else if(!e.target.checked){
            let updatePos;
            if(curPos.includes(',')){
               updatePos = curPos.replace(`, ${e.target.value}`,"")
                positionUpdater(updatePos,'comma')
            }else if(curPos.includes(',') === -1){
                   updatePos = curPos.replace(e.target.value,'')
                    positionUpdater(updatePos)
                    console.log(updatePos,'no comma')
            }
        }
    }
    return (
        <div >
            <div className='positions_checkboxes'>
            <div style={{fontWeight:'bold'}}>Position/s</div>
                <div>
            {playerPositions.slice(3,8).map(pos=><><label>{pos}</label><input type='checkbox' onChange={handleClick} value={pos}/></>)}
            </div>
            <div>
            {playerPositions.slice(0,3).map(pos=><><label>{pos}</label><input type='checkbox' onChange={handleClick} value={pos}/></>)}
            </div>
            <div>
            {playerPositions.slice(8).map(pos=><><label>{pos}</label><input type='checkbox' onChange={handleClick} value={pos}/></>)}
            </div>
            </div>
        </div>

    )
}

export default Positions;