export default function TransactionForm({ submitText, submitFn }){

    return (
        <form className="d-flex" onSubmit={submitFn}>
            <input type="number" name="value" placeholder="Valor" />
            <input type="text" name="title" placeholder="Descrição" />
            <button type="submit">{submitText}</button>
        </form>
    );

};