import {QldbDriver, RetryConfig} from "amazon-qldb-driver-nodejs";
import {ClientConfiguration} from "aws-sdk/clients/qldbsession";

const qldbDriver: QldbDriver = createQldbDriver();

export function createQldbDriver(
    ledgerName: string = 'opinions-board',
    serviceConfigurationOptions: ClientConfiguration = {}
): QldbDriver {
    const retryLimit = 4;
    const maxConcurrentTransactions = 10;
    //Use driver's default backoff function (and hence, no second parameter provided to RetryConfig)
    const retryConfig: RetryConfig = new RetryConfig(retryLimit);
    const qldbDriver: QldbDriver = new QldbDriver(ledgerName, serviceConfigurationOptions, maxConcurrentTransactions, retryConfig);

    return qldbDriver;
}

const main = async function (): Promise<void> {
    try {
        console.debug("Listing table names...");
        const tableNames: string[] = await qldbDriver.getTableNames();
        tableNames.forEach((tableName: string): void => {
            console.debug(tableName);
        });
    } catch (e) {
        console.error(`Unable to create session: ${e}`);
    }
}

if (require.main === module) {
    main();
}