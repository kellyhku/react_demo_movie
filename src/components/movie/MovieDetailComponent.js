import React,{Component} from 'react'

import {Button,Icon,Spin,Alert} from 'antd'

//导入MovieDataService
import MovieDataService from '../../services/MovieDataService'

export default class MovieDetailComponent extends Component{

    constructor(){
        super()
        this.state = {
            isLoading:true,//是否正在加载中
            movieInfo:{}//电影详情
        }
    }

    componentWillMount(){
        var promise = MovieDataService.getMovieInfoById(this.props.match.params.movieId)

        const _this = this
        promise.then(data=>{
            _this.setState({
                isLoading:false,
                movieInfo:data
            })
        },err=>{

        })
    }

    render(){
        return <div>
            <Button onClick={this.goBack.bind(this)} type="primary">
                <Icon type="left" />返回电影列表
            </Button>
            {/* 在JSX中，凡是涉及到js代码，必须使用`{}` */}
            {
                this.renderMovieInfo()
            }
        </div>
    }

    renderMovieInfo(){
        if(this.state.isLoading){//正在加载中
            return <Spin tip="正在加载...">
                <Alert
                message="数据加载中..."
                description="哥正在拼命加载，请稍候..."
                type="info"
                />
           </Spin>
        }else{
            return <div style={{margin:10}}>
                {/* 电影标题 */}
                <h2 style={{textAlign:'center',fontWeight:900}}>{this.state.movieInfo.title}</h2>
                {/* 电影大图 */}
                <div style={{textAlign:'center',marginTop:10}}>
                    <img style={{width:358,height:373}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509449955416&di=148f1058444f183f17fc54a364becee0&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fphoto%2F0001%2F2014-04-21%2F9QBH2F6300AO0001.jpg" alt=""/>
                </div>
                {/* 主要演员 */}
                <p style={{fontSize:16,fontWeight:900,marginBottom:10}}>主要演员:</p>
                <div style={{display:'flex'}}>
                    {
                        this.state.movieInfo.casts.map((item,i)=>{
                            return <div style={{display:'flex',flexDirection:'column',margin:'0 5px',textAlign:'center'}}>
                                <img style={{width:100,height:100}} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=489336886,4086202038&fm=27&gp=0.jpg" alt=""/>
                                <span>{item.name}</span>
                            </div>
                        })
                    }
                </div>
                {/* 剧情简介 */}
                <p style={{fontSize:16,fontWeight:900,margin:'10px 0'}}>剧情简介:</p>
                <p style={{fontSize:12,textIndent:'2rem',lineHeight:'35px'}}>{this.state.movieInfo.summary}</p>
            </div>
        }
    }

    //返回上一个路由
    goBack(){
        this.props.history.goBack()
    }
}