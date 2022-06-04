function prepareResponse(output) {
    const domain = ".42madrid.com";
    output = JSON.parse(output);

    let hosts_results = output["stats"];
    let response_content = {
        success_msgs: [],
        failure_msgs: [],
        hosts_success: [],
        hosts_failed: []
    }

    for (var host in hosts_results) {
        if (hosts_results[host]["unreachable"] != 0) {
            response_content["hosts_failed"].push(host.replace(domain, ""));
            response_content["failure_msgs"].push(`UNREACHABLE: ${host.replace(domain, "")}`);
        } else if (hosts_results[host]["failures"] > 0) {
            response_content["hosts_failed"].push(host.replace(domain, ""));
            response_content["failure_msgs"].push(`FAILURE: ${host.replace(domain, "")}`);
        } else {
            response_content["hosts_success"].push(host.replace(domain, ""));
        }
    }
    return (response_content);
}

export default prepareResponse;