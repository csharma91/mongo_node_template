import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export class home extends Component {
    state = {
        contacts: null
    }
    componentDidMount(){
        axios.get('/api/contacts/all')
        .then(res => {
            console.log(res.data)
            this.setState({
                contacts: res.data
            })
        })
        .catch(err => console.log(err))


    }
    render() {
        let recentContactMarkUp = this.state.contacts ? (
            this.state.contacts.map( contact => <p>{contact.name} </p>
                )
        ): <p>Loading....</p>
        return (
    
        
            <Grid container spacing = {16}>
                <Grid item sm = {8} xs = {12}>
                    {recentContactMarkUp}
                </Grid>
                <Grid item sm = {4} xs = {12}>
                    <p>Profile....</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
