/**   \author Adrien ORTOLA */
package http.handlers;

import http.servers.HTTPResponseHeaderBuilder;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map.Entry;
import logger.Logger;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import configuration.ConfLoader;

/**
 * \class CustomizedHandler
 * \brief abstract class. Implements HttpHandler. The purpose of this class is to allow the a generic handling of the HTTP requests to the different servers.
 * */
public abstract class CustomizedHandler implements HttpHandler{

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief Override the original handling method providing a logging system, an automatic setting of the http headers and an internal server error management.
	 * */
	@Override
	public void handle(HttpExchange t) throws IOException {
		try{
			doYourStuff(t);
		    Logger.addLogToBeWritten(ConfLoader.getEntry("loggerEventsName"),"- Request: "+this.getClass().getSimpleName());
		}catch(Exception e){
		    t.sendResponseHeaders(500,-1);
			OutputStream os = t.getResponseBody();
			os.close();
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}
	
	/** 
	 * \param HttpExchange t, String headerName
	 * \return void
	 * \brief Sets the content of a pre-loaded http header into the response header of the current HttpExchange object
	 * */
	protected void setHeaders(HttpExchange t,String headerName){
		HashMap<String,String> h = HTTPResponseHeaderBuilder.getHeaderOf(headerName);
		for(Entry<String, String> e : h.entrySet()){
			t.getResponseHeaders().add(e.getKey(),e.getValue());
		}
	}
	
	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief abstract method. Main handling method waiting to be implemented.
	 * */
	abstract protected void doYourStuff(HttpExchange t) throws Exception;
}
