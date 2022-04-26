import React , {Component} from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import '../App.css';

// the state is what describes our app, these are the things that can change!
// the state usually lives in the parent component
// because the parent app owns the 'robots' state, then it can change it!

class App extends Component 
{
    constructor()
    {
        super();
        this.state =
        {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount()
    {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({robots: users}));
    }

    //now we'll create a function that we want to trigger whenever we type in the searchBox
    typeChange = (event) =>
    {
        // we have to set the state everytime we trigger the function so we use:
        this.setState({searchfield: event.target.value})         
    }

    render()
    {
        // because the event happened in the input tag, then the 'this' keyword here is not referring to the App!
        // so it's better to use arrow functions in the methods that we create in our class!
        const filteredRobots = this.state.robots.filter(robot => 
            {
               return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
            })
        if (this.state.robots.length === 0)
        {
            return <h1>LOADING...</h1>
        }
        else
        {
            return (
                <div className="tc">
                    <h1 className='f1'>MyRobotFriends!</h1>
                    <SearchBox searchChange={this.typeChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />    
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;