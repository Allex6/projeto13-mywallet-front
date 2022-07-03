export default function TransactionItem({ date, title, value, type }){

    return (
        <>
            <div className="transaction-item d-flex">
                <div className="info">
                    <span>{date}</span>
                    {title}
                </div>
                <div className={`value ${type === 'entrance' ? 'text-success' : 'text-danger'}`}>
                    {value}
                </div>
            </div>
        </>
    );

};