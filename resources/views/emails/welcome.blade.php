<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
        @import url("https://fonts.googleapis.com/css?family=Varela+Round");
* {
  margin: 0;
  padding: 0;
  font-family: Varela Round, "Segoe UI", "Arial", "san serif";
}

img {
  display: inline-block;
}

.container {
  max-width: 500px;
  margin: 20px auto;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 100px;
  position: relative;
}
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #0267C1, #D65108);
}

.logo {
  display: flex;
  margin: 30px auto 0;
  align-items: center;
  justify-content: center;
}
.logo a {
  display: block;
  width: 30px;
  height: 30px;
}
.logo img {
  width: 180px;
}
.logo .c-name {
  display: inline-block;
  font-weight: 600;
}

.thumbs {
  width: 100px;
  margin: auto;
  height: 136px;
}
.thumbs img {
  width: 100%;
}

.illustration {
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 50% 50%/1%;
  text-align: center;
}

.illustration img {
  width: 70%;
  margin: 50px auto;
}

.separator {
  display: block;
  height: 3px;
  width: 70%;
  margin: 10px auto;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.separator::before, .separator::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 33%;
  border-radius: inherit;
  opacity: 0.05;
}
.separator::before {
  left: 0;
  background: #EFA00B;
}
.separator::after {
  left: initial;
  right: 0;
  background: #D65108;
}

.hgroup {
  text-align: center;
  padding: 50px 30px 30px;
}

.name {
  display: block;
  color: black;
  font-weight: 600;
  font-size: 2rem;
}

.hgroup h1 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.hgroup h2 {
  font-size: 19px;
}

.hgroup p {
  font-size: 15px;
  color: slategrey;
  margin-top: 15px;
  text-align: justify;
  line-height: 25px;
}

.items {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.item {
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  margin: 0 auto 50px;
}

.item .icon {
  margin-bottom: 10px;
}

.item .icon img {
  width: 60px;
}

.item .title {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
}

.item .subtitle {
  font-size: 13px;
  color: slategrey;
  padding: 1rem;
}

.button-wrap {
  text-align: center;
  padding: 2rem;
}

button.explore {
  padding: 15px 25px;
  font: inherit;
  background: linear-gradient(to right, #0267C1, #0280EF);
  border-radius: 50px;
  border: 0;
  color: #fff;
  margin: auto;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

button.explore:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 10px -7px rgba(0, 0, 0, 0.1);
}

footer {
  font-size: 12px;
  color: slategrey;
  text-align: center;
  padding: 30px;
}

.rad {
  margin: 0 !important;
  text-align: center !important;
  font-size: 18px !important;
}

.raised {
  font-size: 16px;
  color: #777;
  display: block;
  color: steelblue;
}
    </style>
    <div class="container">
   
        <div class="illustration">
          <div class="hgroup">
            <span class="name">Welcome to Foxwrld🌟 , {{ $user->name }}!
            </span>
            <h1>Thank you for Signing Up</h1>
            <div class="thumbs">
              <a href="https://imgbb.com/"> <img src="http://127.0.0.1:8000/foxwrld.png" alt="good" border="0" /> </a>
            </div>
          </div>
        </div>
      
        <div class="hgroup">
          <p>
            We're excited to have you join our fashion community. Whether you're looking for the latest fashion trends, comfortable everyday wear, or unique statement pieces, you're in the right place.

           
            
            
            
                  <br><br>
            <p>
              <span class="raised">            Happy shopping and stay stylish,
            </span>
            </p>
            <p>If you have any questions, kindly reach out to our team on support@foxwrld.com.</p>
      
            <p>
                Thank you for choosing Foxwrld as your fashion destination.
            </p>
          </p>
      
       
        <footer>
          Foxwrld © 2023
          <br>
          The Foxwrld Team 🛍️👚👗  
          <br>
          Tel: 00 1 460 5416
        </footer>
      </div>
</body>
</html>