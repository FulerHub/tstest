import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {Card} from "antd";
import moment from "moment";
import {getPosts} from "../redux/selectors";

interface IPost {
    id: number,
    title: string,
    description: string,
    date: number
}

interface PropsType {
    post: IPost;

}

const SimilarPosts:FC<PropsType> = (props) => {
    const getSimilarPost = (str:string, str2:string) =>{
        const strArray = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ")
        const str2Array = str2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ")
        for(let i=0; i<str2Array.length; i++){
            return strArray.includes(str2Array[i])
        }
    }
    let numPost = 0;
    const posts = useSelector(getPosts)
    const postClose = posts.filter(function (item:IPost) {
        if( (item.id !== props.post.id && numPost < 3  && (getSimilarPost(item.description,props.post.description) || getSimilarPost(item.title,props.post.title)))){
            numPost++
            return true;
        }
    })
    return (
        <div>
            <h2>Similar posts</h2>
            {postClose.length > 0 ?
                <div className="similar">
                    {postClose.map((item:IPost) =><Card key={item.id} title={item.title} bordered={false} style={{ width: 250 }}><p>{moment(item.date).format('DD.MM.YYYY h:mm:ss')}</p></Card>)}
                </div>
                :
                "Not have Similar"
            }
        </div>
    );
};
export default SimilarPosts;