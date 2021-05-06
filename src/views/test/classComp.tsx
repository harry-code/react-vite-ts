import React from 'react';
import ReactDOM from 'react-dom';
import Demo2 from './demo'

// const Demo2 = React.lazy(() => import('~/views/test/demo'))

class Demo extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            name: '刘刘尧'
        }
    }

    setData = () => {
        this.setState({
            name: '刘德华'
        })
    }
    render() {
        return (
            <>
                <button onClick={this.setData}>set</button>
                <Demo2 />
            </>
        )
    }
}

export default Demo