import React from 'react'

class ViewCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: []
        }

    }
    componentDidMount() {
        fetch('https://marquee-test-app.herokuapp.com/companies')
            .then(response => response.json())
            .then(records => {
                this.setState({
                    records: records
                })
            })
            .catch(error => console.log(error))
    }

    printList() {
        let recordList = []
        this.state.records.map(record => {
            return recordList.push(<tr key={record.cin}><td>{record.cin}</td><td>{record.name}</td></tr>)
        })

        return recordList;
    }

    render() {
        return (
            <div className='container'>
                <a className='btn btn-primary' href='../search'> Company + </a>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>CIN</th>
                            <th scope='col'>Name</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.printList()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default ViewCompany