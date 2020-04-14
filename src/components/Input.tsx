import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
// const style = {
//     backgroundColor: 'white',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     marginBottom: '10px',
//     padding: '10px 15px',
//     width: 'calc(100% - 30px)',

// };
const stylesSpan = {
    color: '777',
    fontSize: '10px',
    fontWeight: 900,
    textTransform: 'uppercase',
} as React.CSSProperties

interface IIputProps {
    placeholder?: string
    label?: string,
    requerid?: boolean
}


const Input: React.StatelessComponent<WrappedFieldProps & IIputProps> = (props) => {

    const { label } = props;


    return (
        <div>
            <span style={stylesSpan}> {label} </span>
            <input className="form-control" {...props} {...props.input} />

        </div>


    )


}
export default Input
