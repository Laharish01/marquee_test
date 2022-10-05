import './AddCompany.css'
import React from 'react'

class AddCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            selectedCompany: {}
        }
    }

    addNewCompany() {

        return (
            <div className="container" >
                <div className="form-outline">
                    <input onChange={e => this.onChangeHandler(e)} type="search" id="form1" className="form-control" placeholder="Search Company" />
                    <ul>
                    {this.state.companies.map((res) => {
                        return <li onClick={e => this.companyClick(e.target)} key={res.cin}>{res.name}</li>
                    })}
                </ul>
                </div>
                
                <div className='btn btn-primary' onClick={this.handleClick.bind(this)}>Submit</div>
            </div>
        )
    }

    companyClick(el){
        var searchBox = document.getElementById('form1')
        searchBox.value = el.innerHTML
        this.setState({
            selectedCompany: this.state.companies.find(o => o.name == searchBox.value)
        })
        
    }
    

    onChangeHandler(e) {
        this.search(e.target.value);
    }

    search() {
        var searchText = document.getElementById('form1').value
        var reqString = "search=" + searchText + "&filter=company";

        (async () => {
            const rawResponse = await fetch('http://localhost:4200/companies/search', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              body: reqString
            });
            const content = await rawResponse.json();
          
            this.setState({
                companies: content
            })
          })();
    }

    handleClick() {        
        const selectedCompany = this.state.selectedCompany;

        //get value of search and to add company to db
        (async () => {
            const rawResponse = await fetch("http://localhost:4200/companies", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedCompany)
            });
            const content = await rawResponse.text();
            console.log(content);
        })().then(() => {
            window.location = "../company_list"
        });

        

    }

    render() {
        return this.addNewCompany();
    }

}



export default AddCompany;