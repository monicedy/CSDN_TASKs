#include<stdio.h>

void n()
{
	putchar('\n');
}	

void line(int a, char c)
{
	for(int i = 0; i < a; i++){
		putchar(c);
	}
}

void rectangle(int a, int b,char c)
{
	for(int i = 0; i < b; i++){
		line(a,c);
		n();
	}
}


void hollowRectangle(int a,int b ,int c)
{
	line(a,c);
	n();
	for(int i = 0; i < b - 2; i++ ){
		putchar(c);
		for(int j = 0; j < a - 2; j++)
			printf(" ");
		putchar(c);
		n();	
	}
	line(a,c);
}

void triangle(int a,char c)
{
	if(a%2==0)
		a+=1;
	for(int i = 0;i < (a+1)/2; i++){
		for(int j = 0; j < a/2 - i; j++){
			putchar(' ');
		}
		line(2*i+1,c);
		n();	
	}	
}

void lozenge(int a,char c)
{
	if(a % 2 == 0)
		a+=1;	
	for(int i = 0; i < (a+1)/2; i++){
		for(int j = 0; j < a/2 -i; j++)
			putchar(' ');
		putchar(c);
		for(int j = 0; j < 2*i-1;j++)
			putchar(' ');
		if(i != 0)
			putchar(c);
		n();
	}
	
	for(int i = 1; i < (a+1)/2; i++){
		for(int j = 0; j < i; j++)
			putchar(' ');
		putchar(c);
		for(int j = 0; j < a-2*i-2; j++)
			putchar(' ');
		if(i != (a+1)/2-1)
			putchar(c);
		n();
	}
}

void hui(int a,char c)
{
	line(a,c);
	n();
	for(int i = 0; i < a-2; i++){
		putchar(c);
		if(i<(a+1)/4-1 || i>a-(a+1)/4-2 ){
			for(int j=0;j<a-2;j++)
				putchar(' ');
		}
		else{
			for(int j=0;j<(a+1)/4-1;j++)
				putchar(' ');
			if(i == (a+1)/4 -1 || i == a-(a+1)/4-2)
				line(a-(a+1)/2,c);	
			else{
				putchar(c);
				for(int t = 0;t < a-(a+1)/2-2;t++)
					putchar(' ');
				putchar(c);
			}
			for(int j=0;j<(a+1)/4 -1;j++)
				putchar(' ');
		}
		putchar(c);
		n();
	}
	line(a,c);
	n();
}


void square(int a,char c)
{
	rectangle(a,a,c);
}


//  已丢弃的  实心倒三角方案
void solidInvertedTriangle(int a,char c)
{
	//a-=2
	if(a % 2 == 0)
		a+=1;
	for(int i = 0; i < (a+1)/2; i++){
		if(i == 0)
			continue;
		for(int j = 0; j < i; j++)
			putchar(' ');
		line(a - 2*i,c);
		n();
	}
}
void solidLozenge(int a, char c)
{
	triangle(a,c);
	solidInvertedTriangle(a,c);
}

int main(void)
{
	int a=12, b=4;
	char c = '*';

	puts("input a b :");
	scanf("%d %d",&a,&b);
	
	
	rectangle(a,b,c);n();	
	
	hollowRectangle(a,b,c);n();

	triangle(a,c);
		
	lozenge(a,c);	
	
	hui(a,c);

	
	//solidLozenge(a,c);
	//square(a,c);
	//hollowTriangle(a,c);
	return 0;
		
}
