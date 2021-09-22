import GraphBlock from "./GraphBlock";



const GridItems = ({
    data,
    className,
    style,
    dispatch,
    root,
    item,
    children,
    type,
    ...rest
}) => {
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
    
    return (
        <div className={`grid-item ${className}`} style={style} {...rest}>
            <div className="grid-item__graph">
                <GraphBlock data={data} width={width} height={height} item={item}/>
            </div>
            {children}
        </div>
    );
};

export default GridItems;