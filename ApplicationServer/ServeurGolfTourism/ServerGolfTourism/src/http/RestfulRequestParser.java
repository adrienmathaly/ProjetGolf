package http;

public class RestfulRequestParser {	
	
	public static String[] parseURI(String URI){
		String[] s = URI.split("/");
		String[] usefulValues=new String[s.length-2];
		for(int i=2;i<s.length;i++){
			usefulValues[i-2]=s[i];
		}
		return usefulValues;
	}

}
