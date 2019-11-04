import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Form } from 'react-bootstrap/';

const style = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px 15px',
    width: 'calc(100% - 30px)',

};
const stylesSpan = {
    color: '777',
    fontSize: '10px',
    fontWeight: 900,
    textTransform: 'uppercase',
} as React.CSSProperties

interface ISelectProps {
    placeholder?: string
    label: string
    data:any
}


const Select: React.StatelessComponent<WrappedFieldProps & ISelectProps> = (props) => {

    const { label, data } = props;
//        const data=[{
//         "id": 1,
//         "nombre": "Victoria"
//     },
//     {
//         "id": 2,
//         "nombre": "Isabella"
//     },
//     {
//         "id": 3,
//         "nombre": "Elizabeth"
//     }
// ]

 
    return (
        <div>
            <span style={stylesSpan}> {label} </span>
            <Form.Control as="select" {...props} {...props.input} style={style} required={true} >
              
              {data.map((dataDetail:any, index:number)=>{

                  return    (                    
                    <option key={dataDetail.id} value={dataDetail.id}>
                   {dataDetail.nombre} /  {index}
                </option>
                    
                    )


              })}
               {/* { <option>Selecciona un item</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>} */}
            </Form.Control>

        </div>


    )


}
export default Select
