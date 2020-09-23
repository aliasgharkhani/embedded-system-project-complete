
String id = "1";


int sensorPin = 0;
String ssid     = "wifi";  
String password = "password"; 

String host     = "https://j5lb6.sse.codesandbox.io"; //our server's address
const int httpPort   = 80;
String uri     = "/";



float humidity(){
  
    return 35;
}


void setup() {
  
  pinMode(A5, INPUT);
  
  
  
  Serial.begin(115200);    
  Serial.println("AT");    // checking connection to ESP
  delay(50);      
    
  
  Serial.println("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"");
  delay(50);        // Connecting to wifi
  
  Serial.println("AT+CIPSTART=\"TCP\",\"" + host + "\"," + httpPort);
  delay(50);        
  if (!Serial.find("OK")) Serial.println("error!");  
 
}


void loop() {
  float temp= map(((analogRead(A5) - 20) * 3.04), 0, 1023, -40, 125); //read temperature value
  
  float hum =humidity();
  
 
 
  String packet = "POST " + uri + " HTTP/1.1\r\nHost: " + host + "\r\nContent-Type: text/plain\r\n\r\n"+ id + ":" + String(temp)+"-" +String(hum);
  int l = httpPacket.length();
  
 
  Serial.print("AT+CIPSEND=");
  Serial.println(l);
  delay(50); 
  Serial.print(packet);
  
  delay(600000);    
  
  
}

