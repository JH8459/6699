import style from './MainSayingMiniModal.module.css'
function MainSayingMiniModal({modalOff, clickLike, clickNew}){
  return(
    <div>
      <div className={style.box_bg } onClick ={modalOff}/>  
      <div className={style.box}>
        <div className={style.like} onClick={clickLike}>좋아요순 </div>
        <div className={style.new}  onClick={clickNew}>최신순</div>
      </div>
    </div>         
  )
}
export default MainSayingMiniModal;