import style from'./MyPosting.module.css'
import {setPosts,setIsLoading} from '../../store/MySlice'
import {useDispatch,useSelector} from 'react-redux' 
import MyPostingBox from './MyPostingBox';
import { REACT_APP_API_URL } from '../../config';
import {useEffect,useState} from 'react'
import axios from 'axios';
import MyPostPagination from '../Pagination/MyPostPagination';

function MyPosting(){
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.mypage);
    const [loading,setLoading] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(6);
    const [rendering, setRendering] = useState(true);

    useEffect(()=>{
        const fetchPosts = async () => {
            const res = await axios.get(
                `${REACT_APP_API_URL}/user/myarticle`,
                {withCredentials: true}
            );
            if(rendering){
                dispatch(setPosts(res.data.data.filteredArticle));
                setRendering(false);
                setLoading(false);
            }
        }
        fetchPosts();
    },[rendering])

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div id={style.changing_area}>
        <div id={style.posts_wrap}>
            <div className = {style.posts}>
                <MyPostingBox posts={currentPosts} loading={loading}/> 
            </div>
        </div>
        <div id={style.pagenation_wrapper}>
            <MyPostPagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
        </div>
    )
}

export default MyPosting;