package http.users;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map.Entry;

public class SetOfUsers {
	
	
	private static HashMap<String,User> users;
	
	public static void prepareUsers(){
		users=new HashMap<String,User>();
	}
	
	public static void addUser(String token,User user){
		users.put(token,user);
		//System.out.println("Token: " + token);
	}
	
	public static void disconnectUser(String token){
		users.get(token).setConnected(false);
	}
	
	public static void removeUser(String token){
		users.remove(token);
	}
	
	public static int amountOfUsers(){
		return users.size();
	}
	
	public static int numberOfConnected(){
		int i=0;
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isConnected()){
				i++;
			}
		}
		return i;
	}
	
	public static float totalOfAllDistances(){
		float i=0;
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				i=i+e.getValue().getTravelledDistance();
			}
		}
		return i;
	}
	
	public static LinkedList<Float> listOfDistances(){
		LinkedList<Float> listOfDistances=new  LinkedList<Float>();
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				listOfDistances.add(e.getValue().getTravelledDistance());
				//System.out.println("Coords " + e.getValue().getTravelledDistance() + " - " + e.getValue().getTravelledDistance());
			}
		}
		return listOfDistances;
	}
	
	public static LinkedList<Point> listOfCoordinates(){
		LinkedList<Point> listOfCoordinates=new  LinkedList<Point>();
		for(Entry<String, User> e : users.entrySet()){
			if(e.getValue().isFullyCreated()){
				listOfCoordinates.add(new Point(e.getValue().getLatitude(),e.getValue().getLongitude()));
				//System.out.println("Coords " + e.getValue().getLatitude() + " - " + e.getValue().getLongitude());
			}
		}
		return listOfCoordinates;
	}
	
	public static void updateUserLocation(String token, Point newPoint){
		User MrNobody = users.get(token) ;
		MrNobody.setTravelledDistance(MrNobody.getTravelledDistance()+newPoint.distanceBetweenMeAnd(MrNobody.getLocation()));
		MrNobody.setLocation(newPoint);
	}
	
	public static void setFirstLocationOf(String token, Point firstPoint){
		User MrNobody = users.get(token) ;
		MrNobody.setTravelledDistance(0);
		MrNobody.setLocation(firstPoint);
		MrNobody.setFullyCreated(true);
	}
	
	public static boolean isUserFullyCreated(String token){
		return users.get(token).isFullyCreated();
	}
}
