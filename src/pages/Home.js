import React, { Component } from 'react';
 
class Home extends Component {
    render() {
        return (
          <div className="App">
          <Modal />
          <Toast />
          {isLoggedIn && <Nav />}
          {isLoggedIn ? <SearchPage /> : <AuthPage />}
          {isLoggedIn ? <LectureListPage /> : <AuthPage />} 
          {isLoggedIn ? <DetailLecPage /> : <AuthPage />}
          </div>  
        );
    }
}
 
export default Home;


