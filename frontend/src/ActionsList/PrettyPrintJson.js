function PrettyPrintJson({data}) {
    return (<div>
                <pre><code>
                    {JSON.stringify(data, null, 2) }
                </code></pre>
            </div>
    );
}

export default PrettyPrintJson;