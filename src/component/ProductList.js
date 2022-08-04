import React,{ useState  } from "react"; 

const ProductList = () => {

    const dummydata = [
        {Name:'Aloe Vera Gel', Category:'Health', Description: 'Healing gel from South Korea. Used by BTS.', Price: 50.00, Quantity:1},
        {Name:'Collagen Face Mask', Category:'Health', Description: 'Get glowing skin in 1 week! Number 1 product in Busan.', Price: 25.00, Quantity:100},
        {Name:'Anti-aging body lotion', Category:'Health', Description: 'Get snow white skin. Number 1 product in Busan.', Price: 25.00, Quantity:100},
        {Name:'iPhone22', Category:'Technology', Description: 'Latest iPhone from the future', Price: 1500.00, Quantity:2},
        {Name:'MacBook Pro 15 M6', Category:'Technology', Description: 'Latest MacBook from the future', Price: 3500.00, Quantity:3},
        {Name:'Playstation 5', Category:'Technology', Description: 'Next-gen console from Sony', Price: 799.00, Quantity:5},

    ]

    const [value, setValue] = useState('');
    const [dataSource, setDataSource] = useState(dummydata);
    const [tableFilter, setTableFilter] = useState([]);

    const filterData = (e) => {
        if (e.target.value != ""){
            setValue(e.target.value);
            const filterTable = dataSource.filter(o => Object.keys(o).some(k=>
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                ));
            setTableFilter([...filterTable])
        }else{
            setValue(e.target.value);
            setDataSource([...dataSource])
        }
    }
    return(
        <><div>
            <h4>List of Products</h4>
        </div>
        <div>
        <button type="button" class="btn btn-dark">Add Product</button>
        </div>
        <div className="container mt-5">
            <div class="input-group mb-3">
             <input type ="text" class="form-control" placeholder="Search" aria-label="Name" 
             aria-aria-describedby="basic-addon1" value={value} onchange={filterData}/>
        </div>
    
        
        <table class="table">
        
    <thead class="table-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {value.length> 0 ? tableFilter.map((data) => {
        return (
            <tr>
            <td>{data.Name}</td>
            <td>{data.Category}</td>
            <td>{data.Description}</td>
            <td>{data.Price}</td>
            <td>{data.Quantity}</td>
            <td><button className ="btn btn-dark">Update</button><button className ="btn btn-dark">Remove</button></td>
            </tr>
        )
    })
    :
    dataSource.map((data) => {
        return(
        <tr>
            <td>{data.Name}</td>
            <td>{data.Category}</td>
            <td>{data.Description}</td>
            <td>{data.Price}</td>
            <td>{data.Quantity}</td>
            <td><button className ="btn btn-dark">Update</button><button className ="btn btn-dark">Remove</button></td>
        </tr>
    )
   })}
  </tbody>
</table>
</div>
</> 
 )
}

export default ProductList;



  