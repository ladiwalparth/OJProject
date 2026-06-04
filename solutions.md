# Reference C++ Solutions — Codeforces style (read t, loop t times)

## SUM_PAIR - Sum of a Pair (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long a,b;cin>>a>>b;cout<<a+b<<"\n";}return 0;}
```

## MAX_OF_THREE - Maximum of Three (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long a,b,c;cin>>a>>b>>c;cout<<max({a,b,c})<<"\n";}}
```

## PARITY - Even or Odd (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long n;cin>>n;cout<<((n%2==0)?"Even":"Odd")<<"\n";}}
```

## FACTORIAL - Factorial (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;unsigned long long f=1;for(int i=2;i<=n;i++)f*=i;cout<<f<<"\n";}}
```

## STR_REVERSE - Reverse a String (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string s;cin>>s;reverse(s.begin(),s.end());cout<<s<<"\n";}}
```

## VOWEL_COUNT - Count the Vowels (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string s;cin>>s;int c=0;for(char ch:s){char l=tolower(ch);if(l=='a'||l=='e'||l=='i'||l=='o'||l=='u')c++;}cout<<c<<"\n";}}
```

## FIB_NTH - N-th Fibonacci (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;unsigned long long a=0,b=1;for(int i=0;i<n;i++){unsigned long long c=a+b;a=b;b=c;}cout<<a<<"\n";}}
```

## GCD_TWO - Greatest Common Divisor (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long a,b;cin>>a>>b;cout<<__gcd(a,b)<<"\n";}}
```

## PALINDROME - Palindrome Check (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string s;cin>>s;string r=s;reverse(r.begin(),r.end());cout<<((s==r)?"YES":"NO")<<"\n";}}
```

## SUM_TO_N - Sum 1 to N (Easy)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long n;cin>>n;cout<<n*(n+1)/2<<"\n";}}
```

## ARRAY_SUM - Array Sum (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;long long s=0;for(int i=0;i<n;i++){long long x;cin>>x;s+=x;}cout<<s<<"\n";}}
```

## COUNT_DISTINCT - Count Distinct Elements (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;set<long long>st;for(int i=0;i<n;i++){long long x;cin>>x;st.insert(x);}cout<<st.size()<<"\n";}}
```

## SECOND_LARGEST - Second Largest (Distinct) (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;set<long long,greater<long long>>st;for(int i=0;i<n;i++){long long x;cin>>x;st.insert(x);}if(st.size()<2)cout<<"NONE\n";else{auto it=st.begin();++it;cout<<*it<<"\n";}}}
```

## LINEAR_INDEX - First Index of Key (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;long long k;cin>>k;int idx=-1;for(int i=0;i<n;i++)if(a[i]==k){idx=i;break;}cout<<idx<<"\n";}}
```

## ANAGRAM - Anagram Check (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string a,b;cin>>a>>b;string x=a,y=b;sort(x.begin(),x.end());sort(y.begin(),y.end());cout<<((x==y)?"YES":"NO")<<"\n";}}
```

## SORT_ASC - Sort Ascending (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;vector<long long>a(n);for(auto&x:a)cin>>x;sort(a.begin(),a.end());for(int i=0;i<n;i++){cout<<a[i];if(i+1<n)cout<<" ";}cout<<"\n";}}
```

## PRIME_CHECK - Prime Check (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long n;cin>>n;bool p=(n>=2);for(long long i=2;i*i<=n;i++)if(n%i==0){p=false;break;}cout<<(p?"Prime":"Not Prime")<<"\n";}}
```

## COUNT_PRIMES - Count Primes up to N (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;if(n<2){cout<<0<<"\n";continue;}vector<char>is(n+1,1);is[0]=is[1]=0;for(int i=2;(long long)i*i<=n;i++)if(is[i])for(int j=i*i;j<=n;j+=i)is[j]=0;int c=0;for(int i=2;i<=n;i++)if(is[i])c++;cout<<c<<"\n";}}
```

## POWER_MOD - Modular Exponentiation (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){long long a,b,m;cin>>a>>b>>m;a%=m;long long r=1%m;while(b>0){if(b&1)r=(__int128)r*a%m;a=(__int128)a*a%m;b>>=1;}cout<<r<<"\n";}}
```

## MAX_FREQUENCY - Most Frequent Element (Medium)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;map<long long,int>f;for(int i=0;i<n;i++){long long x;cin>>x;f[x]++;}long long best=0;int bc=-1;for(auto&pr:f)if(pr.second>bc){bc=pr.second;best=pr.first;}cout<<best<<"\n";}}
```

## LCS - Longest Common Subsequence (Hard)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string a,b;cin>>a>>b;int n=a.size(),m=b.size();vector<vector<int>>dp(n+1,vector<int>(m+1,0));for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(a[i-1]==b[j-1])dp[i][j]=dp[i-1][j-1]+1;else dp[i][j]=max(dp[i-1][j],dp[i][j-1]);}cout<<dp[n][m]<<"\n";}}
```

## KADANE - Maximum Subarray Sum (Hard)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;cin>>n;long long best=0,cur=0;for(int i=0;i<n;i++){long long x;cin>>x;if(i==0){best=cur=x;}else{cur=max(x,cur+x);best=max(best,cur);}}cout<<best<<"\n";}}
```

## EDIT_DISTANCE - Edit Distance (Hard)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){string a,b;cin>>a>>b;int n=a.size(),m=b.size();vector<vector<int>>dp(n+1,vector<int>(m+1,0));for(int i=0;i<=n;i++)dp[i][0]=i;for(int j=0;j<=m;j++)dp[0][j]=j;for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(a[i-1]==b[j-1])dp[i][j]=dp[i-1][j-1];else dp[i][j]=1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});}cout<<dp[n][m]<<"\n";}}
```

## KNAPSACK01 - 0/1 Knapsack (Hard)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int n;long long W;cin>>n>>W;vector<long long>wt(n),val(n);for(int i=0;i<n;i++)cin>>wt[i]>>val[i];vector<long long>dp(W+1,0);for(int i=0;i<n;i++)for(long long w=W;w>=wt[i];w--)dp[w]=max(dp[w],dp[w-wt[i]]+val[i]);cout<<dp[W]<<"\n";}}
```

## COIN_CHANGE_MIN - Minimum Coin Change (Hard)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){int t;cin>>t;while(t--){int amount,k;cin>>amount>>k;vector<int>coins(k);for(auto&c:coins)cin>>c;const long long INF=1e18;vector<long long>dp(amount+1,INF);dp[0]=0;for(int a=1;a<=amount;a++)for(int c:coins)if(c<=a&&dp[a-c]+1<dp[a])dp[a]=dp[a-c]+1;cout<<(dp[amount]>=INF?-1:dp[amount])<<"\n";}}
```