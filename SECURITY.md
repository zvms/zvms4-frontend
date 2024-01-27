# Security

This program is used to count student volunteer hours and activities at Zhenhai Middle School.

This project is officially adapted to the actual situation of Zhenhai Middle School by the development team, if you are interested in the project, you are welcome to develop the project. However, we are not responsible for secondary development.

This version is ZVMS 4. This means that ZVMS 1-3 are not supported after the release (EOF).

## Safety in Campus Use

Due to school regulations, we do not place some features on the Xuehai Pad accessible to volunteers, but other access is not restricted. Our method of determining this is through UA. When your `device` is `Samsung`, it will automatically be determined to be a Xuehai Pad. We will continue to optimize this method as we go along.

In the meantime, we have integrated the program into Clarity. This means that your activity on the platform will be recorded, so please do not display private information directly.

## Application Development Security

We strive to maximize security during development. We have Dependabot enabled to validate the security of our dependencies, and we use CodeQL to analyze our code for potential vulnerabilities. At the same time, we use emerging technology stacks, such as using `bcrypt` instead of `sha`, `RSA` for transfers, and so on.

If you find some security vulnerabilities, please raise an issue.
