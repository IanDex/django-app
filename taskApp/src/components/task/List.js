// import axios from 'axios'
// import React, {Component} from 'react'
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import IconButton from '@material-ui/core/IconButton';
// import { MemoryRouter, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import DeleteIcon from '@material-ui/icons/Delete';
// import {AxiosHelper} from "../../helpers/AxiosHelper";
// import {Checkbox} from "@material-ui/core";
// import Pagination from '@material-ui/lab/Pagination';
// import PaginationItem from '@material-ui/lab/PaginationItem';
//
// const POSTS_URL = 'todo/';
// export default class ListPost extends Component {
//
//
//   state = {
//     posts: [],
//     links: '',
//   }
//
//   componentDidMount() {
//     this.loadPosts(POSTS_URL)
//   }
//
//   loadPosts = async (url) => {
//     AxiosHelper(url, 'GET')
//       .then((res) => {
//         console.log(res.data);
//         const posts = res.data.results
//         this.setState({
//           posts,
//           links: res.data.links,
//         })
//       })
//       .catch((e) => {
//         localStorage.clear();
//         window.reload();
//       })
//
//   }
//
//   handleDelete = (id) => {
//     let DELETE_URL = POSTS_URL + id + '/';
//     axios.delete(DELETE_URL)
//       .then(res => {
//         alert("Postagem deletada com sucesso !");
//         window.scrollTo(0, 0);
//
//       });
//
//   }
//
//   handleUpdate = (post) => {
//     console.log(post)
//
//   }
//
//   prevPage = () => {
//     let toPage = this.state.links.previous
//     this.loadPosts(toPage);
//   }
//
//   nextPage = () => {
//     let toPage = this.state.links.next
//     this.loadPosts(toPage);
//   }
//
//   render() {
//     const {links} = this.state
//     const {posts} = this.state
//
//     return (
//
//     )
//   }
// }