import React, {Component} from 'react';
import './App.css';
import PathFindingVisualiser from "./PathFindingVisualizer/PathFindingVisualizer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridId: 0,
        }
    }

    // By updating the key of a Component we force the Dom to rerender
    // and erase the previous Grid
    resetGrid() {
        this.setState((state) => {
            return {gridId: state.gridId + 1}
        })
    }

    render() {
        let uniqueId = this.state.gridId;
        return (
            <div className="App">
                <button className={"warm-red"} onClick={() => this.resetGrid()}>
                    Reset Grid
                </button>
                <PathFindingVisualiser key={uniqueId}/>
            </div>
        );
    }
}

export default App;
