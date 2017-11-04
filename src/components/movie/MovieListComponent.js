import React,{Component} from 'react'
import { Spin, Alert,Rate } from 'antd';

//导入MovieDataService，调用getMovieListByType，给他传递一个电影类型
import MovieDataService from '../../services/MovieDataService'

/**
 * 电影项的样式
 */
const movieItemStyle = {
    border:'1px solid #eee',
    padding:4,
    margin:5
}

//导入外部样式
import '../../statics/css/Movie.css'

export default class MovieListComponent extends Component{
    constructor(){
        super()

        this.state = {
            movieType:'in_theaters', //电影类型
            isLoading : true,//是否正在加载
            movieList:[] //电影列表
        }
    }

    componentWillMount(){
        this.loadMovieListDataByType()
    }

    loadMovieListDataByType(){
      
        var promise = MovieDataService.getMovieListByType(this.state.movieType)
        
        const _this = this
        promise.then(data=>{
            _this.setState({
                isLoading:false, //已经加载完毕
                movieList:data.subjects //给电影列表赋值
            })
        }).catch(err=>{
            console.log(err)    
        })
    }

    //当接收到父组件传递过来新的参数的时候，就调用
    componentWillReceiveProps(props){
        this.setState({
            movieType:props.match.params.movieType,
            isLoading:true
        },()=>{
            this.loadMovieListDataByType()
        })
    }

    render(){
        if(this.state.isLoading){//正在加载
            return <Spin tip="正在加载...">
            <Alert
              message="数据加载中..."
              description="哥正在拼命加载，请稍候..."
              type="info"
            />
          </Spin>
        }else{//加载完毕
            return <div style={{display:'flex',flexWrap:'wrap'}}>
                {/* JSX中要写js代码，必须使用`{}` */}
                {
                    this.state.movieList.map((item,i)=>{
                        return <div onClick={()=>{this.goToMovieDetail(item.id)}} className="movieItem" style={movieItemStyle} key={i}>
                            {/* 图片 */}
                            <img style={{width:186}} src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ac2a81e649a98226b8c12c21b2b9de3c/9a504fc2d5628535a233d1b29aef76c6a6ef6355.jpg" alt=""/>
                            {/* 标题 */}
                            <p style={{textAlign:'center'}}><strong>{item.title}</strong></p>
                            {/* 电影类型 */}
                            <p style={{textAlign:'center'}}><strong>电影类型：{item.genres.join(',')}</strong></p>
                            {/* 上映年份 */}
                            <p style={{textAlign:'center'}}><strong>上映年份：{item.year}</strong></p>
                            {/* 评分 */}
                            <div><strong>评分：<Rate disabled defaultValue={item.rating.average/2} /></strong></div>
                        </div>
                    })
                }
            </div>
        }
    }

    goToMovieDetail(movieId){
        //编程式导航
        this.props.history.push('/movie/detail/'+movieId)
    }
}