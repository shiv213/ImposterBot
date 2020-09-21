import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()


setuptools.setup(
    name='ImposterBot',
    version='0.0.1',
    packages=setuptools.find_packages(),
    url='https://github.com/shiv213/ImposterBot/',
    license='MIT',
    author='Shiv Trivedi',
    author_email='shiv.v.trivedi@gmail.com',
    description='An open-source Discord bot to enhance your Among Us experience.',
    long_description=long_description
)
