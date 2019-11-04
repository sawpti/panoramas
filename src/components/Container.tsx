import * as React from 'react';
const style=(center:boolean): React.CSSProperties=>({
    alignItems: center? 'center':undefined,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection:'column',
    // height:  'calc(100vh - 20px)',
    justifyContent:'center',
    padding: '10px 15px',
    width:'cal(100vw - 30px)',
    
   
  }  );
interface IContainerPorps{
    center?: boolean
}


export default class Container extends React.Component<IContainerPorps> {
   public render() {
        const {children, center=false}=this.props;
        return (

            <div style={style(center)}>
                {children}
           </div>
        )
    }
}
