/**   \author Adrien ORTOLA */
package http.servers;

import java.io.IOException;
import java.net.InetSocketAddress;
import logger.Logger;
import com.sun.net.httpserver.HttpServer;
import configuration.ConfLoader;

/**
 * \class HTTPGolfServer
 * \brief Abstract.
 *  The purpose of this class is to provide basic server oriented methods for the different types of servers.
 * */
abstract class HTTPGolfServer{

	/** The HTTP server (Oracle HTTP server API) */
	private HttpServer server;
	/** The name of the server (may be use for several purposes such as logging)*/
	private String serverName;
	
	/** 
	 * \param String name, String port
	 * \return void
	 * \brief Constructor.
	 * Generic preparation of the HTTP server.
	 * */
	public HTTPGolfServer(String name, String port){
		this.serverName=name;
		try {
			server = HttpServer.create(new InetSocketAddress(Integer.parseInt(port)), 0);
			createMultiEntriesContext();
		    server.setExecutor(null);
		} catch (NumberFormatException | IOException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief returns the current http server
	 * */
	public HttpServer getServer() {
		return server;
	}

	/** 
	 * \param HttpServer server
	 * \return void
	 * \brief Set the current server
	 * */
	public void setServer(HttpServer server) {
		this.server = server;
	}

	/** 
	 * \param none
	 * \return String
	 * \brief returns the name of the server
	 * */
	public String getServerName() {
		return serverName;
	}

	/** 
	 * \param String serverName
	 * \return void
	 * \brief set the nme of the server
	 * */
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	/** 
	 * \param none
	 * \return void
	 * \brief starts the current server. Logs it.
	 * */
	public void launchMePlease(){
	    server.start();
	    Logger.addLogToBeWritten("Events",serverName+" - Server launched");
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief Ends the current server on the spot. Logs it.
	 * */
	public void killMePlease(){
		server.stop(0);
	    Logger.addLogToBeWritten("Events",serverName+" - Server stopped");
	}
	
	/** 
	 * \param none
	 * \return void
	 * \brief abstract.
	 * Generic method for handling http requests.
	 * */
	protected abstract void createMultiEntriesContext();
}
