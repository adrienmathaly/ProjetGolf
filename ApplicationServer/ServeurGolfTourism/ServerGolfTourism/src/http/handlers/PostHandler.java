/**   \author Adrien ORTOLA */
package http.handlers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.sun.net.httpserver.HttpExchange;

/**
 * \class PostHandler
 * \brief abstract class. Implements CustomizedHandler. The purpose of this class is the same as the CustomizedHandler except that it provides a String to JSON parsing method.
 * */
public abstract class PostHandler extends CustomizedHandler{

	/** 
	 * \param HttpExchange t
	 * \return JSONObject
	 * \brief Parses the string JSON represented in the request body of a POST method and turn it into a JSONObject
	 * */
	protected JSONObject parseJSONInfo(HttpExchange t) throws IOException, ParseException {
		InputStreamReader isr = new InputStreamReader(t.getRequestBody());
		BufferedReader bfr = new BufferedReader(isr);
		return(JSONObject) new JSONParser().parse(bfr);
	}
}
