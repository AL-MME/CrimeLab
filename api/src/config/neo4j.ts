import neo4j, { Driver } from 'neo4j-driver';

export const connectNeo4j = async () => {
    const driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'password')
    );

    try {
        console.log('🔗 Connecting to Neo4j...');
        await driver.verifyConnectivity();
        console.log('✅ Neo4j connection successful');
        return driver;
    } catch (error) {
        console.error('❌ Neo4j Connection Error:', error);
        process.exit(1);
    }
}

export const closeNeo4j = async (driver: Driver) => {
    try {
        console.log('🔗 Closing Neo4j connection...');
        await driver.close();
        console.log('✅ Neo4j connection closed');
    } catch (error) {
        console.error('❌ Neo4j Connection Error:', error);
        process.exit(1);
    }
}