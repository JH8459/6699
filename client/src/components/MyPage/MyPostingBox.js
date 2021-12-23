import style from'./MyPostingBox.module.css'
import {useSelector, useDispatch} from 'react-redux';
import { setSayingIdforCreatedArticle, setCreatedArticleId, getCreatedArticleInfo, 
getSayingInfoCreatedArticle,getTotalComment,getImageInfo }from '../../store/MainSlice';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import defaultImg from '../../images/canttuna.png'

function MyPostingBox({posts,loading}){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { focusedSayingId, sayingInfoCreatedArticle, createdArticleInfo}= useSelector(state => state.main);
  const { isLogin, userInfo } = useSelector((state) => state.auth);
  // 현재 작성한 게시글 ID (articleId)
  const currentArticleId = createdArticleInfo.id

  const handleThumbnail = async (id) => {
    console.log(id);
    // 현재 보고있는 명언 아이디와 해당 게시글 아이디를 서버에 get 요청
    // 서버에 요청할때 제목(title), 게시글 이미지(image), 명언Id(saying_id)를 함께 담아서 전달한다 
    const response = await axios.get(`${REACT_APP_API_URL}/${focusedSayingId}/article/${id}`, 
    { withCredentials: true }
    );
    // 게시글 페이지에서 조회될 수 있도록, 해당 게시글 정보를 담는다
    dispatch(getCreatedArticleInfo(response.data.data.articleInfo));

    /*****************  명언  ********************/
    // 현재 선택된 명언Id를 통해, 명언 정보를 불러온다
    const sayingInfo = await axios.get(`${REACT_APP_API_URL}/${focusedSayingId}`)
    // 현재 선택된 명언Id를 기반으로, 게시글 페이지에서 사용할 수 있게 명언 정보를 저장한다
    dispatch(getSayingInfoCreatedArticle({
      id: sayingInfo.data.data.filteredSaying.id,
      content: sayingInfo.data.data.filteredSaying.content,
      category: sayingInfo.data.data.filteredSaying.category,
      total_like: sayingInfo.data.data.filteredSaying.total_like,
      createdAt: sayingInfo.data.data.filteredSaying.createdAt,
      updatedAt: sayingInfo.data.data.filteredSaying.updatedAt
    }));
    /*****************  명언  ********************/
    /*****************  댓글  ********************/

  //   [GET] 게시글 댓글 조회
  // ~/:sayingId/article/:articleId/comment
  // response2 변수에 서버 응답결과를 담는다
  const response2 = await axios.get(
    `${REACT_APP_API_URL}/${focusedSayingId}/article/${id}/comment`,
    { withCredentials: true }
    )
    console.log("댓글정보 확인!!!:", response2.data.data)
    // 댓글이 있을때,
    if(response2.data.data) {
      dispatch(getTotalComment(response2.data.data.commentInfo));
    } else {
      dispatch(getTotalComment([]));
    }

    /*****************  댓글  ********************/


    // 해당 게시글 페이지로 이동한다
    navigate('/postingpage');
  }

  /*****************  글  ********************/
  if(loading){
    return <h2 className={style.noPost}>loading...</h2>
  } else if(posts.length > 0){
    /******** 게시물의 이미지만 넣는 배열(postsImages) *********/
    /******** 맵하기 전 바깥에서 이미지만 뽑아낼거겁니다. **********/
    const postImages = posts.map((el)=>{
    /***** 이미지가 있으면 넣고 없으면 디폴트이미지를 넣습니다.*******/
        // if (el.image !== null){
        //   console.log(el.image)
        //   return el.image;}
        // else {
        //   console.log(el.image)
        //   return {defaultImg};}
        console.log(el.image)
      })

    return (
      <div id={style.container}>
        <div id={style.posts_wrap}>
      {posts.map((post,index) => (
        <li key ={post.id} className={style.post}
        id={post.saying.category === '건강'? 
        style.health : 
        post.saying.category === '학습'?
         style.study :
        post.saying.category === '경제'?
         style.economy:
        post.saying.category === '인간관계'?
         style.relationship:
        post.saying.category === '사랑'?
         style.love : null}
         onClick={() => {handleThumbnail(post.id)}}>
          <div>
          <li className={style.thumbnail}>
              {/********** 아까만든 배열인 postImages에서 postImages[index] 로 이미지를 가져옵니다. *************/}
              <img className={style.image} src={postImages[index] !== defaultImg ?`${REACT_APP_API_URL}/uploads/${postImages[index]}`:defaultImg}/>
              {/*********** img는 자식 태그를 가져올 수 없기에 맨 안쪽으로 들어갑니다. 안그럼 에러 뜨네요. *************/}
              <div className={style.title_wrap}>
              <div className={style.title}>{post.title}</div>
              </div>
            </li>
          </div>
        </li>
      ))}
      </div>
      </div>
    )} else return (
      <div className = {style.noPost}>
      해당 명언의 게시물이 없습니다. 😢
    </div>)
}
export default MyPostingBox;