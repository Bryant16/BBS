import React from 'react';


const Positions = ({positionUpdater, currentPos})=>{
    let playerPositions = ['RHP','LHP','Catcher','1B','2B','3B','SS','RF','LF','CF']
    let curPos = currentPos
    const handleClick = (e)=>{
        // e.preventDefault()
        if(e.target.checked){
            let newPos = curPos += ` ${e.target.value}`
            positionUpdater(newPos)
           
        }else if(!e.target.checked){
            let updatePos;
            updatePos = curPos.replace(`${e.target.value}`,"")
            positionUpdater(updatePos)
        }
    }
    const isCatcher = (p)=>{
        if(p==='Catcher') return 'C'
        return p
    }
   console.log(currentPos,'current')
    return (
        <div >
            <div className='positions_checkboxes'>
            <div style={{fontWeight:'bold'}}>Position/s</div>
                <div>
            {playerPositions.slice(3,8).map(pos=><><label>{isCatcher(pos)}</label><input type='checkbox' checked={curPos.includes(pos)} onChange={handleClick} value={pos}/></>)}
            </div>
            <div>
            {playerPositions.slice(0,3).map(pos=><><label>{isCatcher(pos)}</label><input type='checkbox' checked={curPos.includes(pos)} onChange={handleClick} value={pos}/></>)}
            </div>
            <div>
            {playerPositions.slice(8).map(pos=><><label>{pos}</label><input type='checkbox' checked={curPos.includes(pos)} onChange={handleClick} value={pos}/></>)}
            </div>
            </div>
        </div>

    )
}

export default Positions;