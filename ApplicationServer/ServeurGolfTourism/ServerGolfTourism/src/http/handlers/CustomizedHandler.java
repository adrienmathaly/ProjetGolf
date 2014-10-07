package http.handlers;

import http.servers.HTTPResponseHeaderBuilder;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;
import logger.Logger;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import configuration.ConfLoader;

public abstract class CustomizedHandler implements HttpHandler{

	public CustomizedHandler(){
	}

	@Override
	public void handle(HttpExchange t) throws IOException {
		try{
			doYourStuff(t);
		    Logger.addLogToBeWritten(ConfLoader.getEntry("loggerEventsName"),"- Request: "+this.getClass().getSimpleName());
		}catch(Exception e){
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}
	
	protected void setHeaders(HttpExchange t,String headerName){
		HashMap<String,String> h = HTTPResponseHeaderBuilder.getHeaderOf(headerName);
		for(Entry<String, String> e : h.entrySet()){
			t.getResponseHeaders().add(e.getKey(),e.getValue());
		}
	}
	
	abstract protected void doYourStuff(HttpExchange t) throws Exception;
}
